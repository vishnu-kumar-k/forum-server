const BlogPost=require("../Models/BlogPost");
const User=require("../Models/User");
const UploadFile = require("../s3");
exports.upload = async (req, res) => {
    try {
        console.log("Hitting");
        const { headerImage, footerImage, headerImageType, footerImageType, title, description, author, userId } = req.body;
        console.log(author);
        console.log(headerImage);
        console.log(headerImageType);
        if (!headerImage || !headerImageType)
            return res.status(400).json({ message: "error need header image" });

        const headerImageUrl = await UploadFile(headerImage, author, headerImageType);
        var footerImageUrl = null;
        if (footerImage && footerImageType)
            footerImageUrl = await UploadFile(footerImage, author, footerImageType);

        console.log(headerImageUrl);
        console.log(footerImageUrl);

        const newBlogPost = await BlogPost.create({
            title, description, author, userId, headerImageUrl, footerImageUrl
        });

        await User.findByIdAndUpdate(userId, { $push: { posts: newBlogPost._id } });

        // Fetch the followers of the user who uploaded the blog post
        const user = await User.findById(userId).populate('followers');

        // Create notifications for each follower
        for (const follower of user.followers) {
            await User.findByIdAndUpdate(follower._id, {
                $push: {
                    notifications: {
                        message: `New blog post by ${author}: ${title}`,
                        date: new Date()
                    }
                }
            });
        }

        return res.status(200).json({ message: "Blog post created", details: newBlogPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in upload", error });
    }
};

exports.all=async(req,res)=>{
    try{
        const allBlogs=await BlogPost.find({});
        return res.status(200).json({message:"all blogs",feeds:allBlogs});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in getting all blogs",error})
    }
}

exports.myBlogs=async(req,res)=>{
    try{
        const allBlogs=await BlogPost.find({userId:req.body.userId});
        return res.status(200).json({message:"my blogs",feeds:allBlogs});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in getting My blogs",error})
    }
}

exports.removeBlog = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        // Delete the blog post
        await BlogPost.deleteOne({ _id: postId });

        // Remove the postId from the user's posts array
        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });

        return res.status(200).json({ message: "Removed blog" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in removing blog", error });
    }
}
exports.addFavourite = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // Check if the blog post exists
        const blogPost = await BlogPost.findOne({_id:postId});
        console.log(blogPost);

        if (!blogPost) {
            return res.status(400).json({ message: "Blog post not found" });
        }

        // Add the postId to the user's favoriteBlogs array
        await User.findByIdAndUpdate(userId, { $addToSet: { favoriteBlogs: postId } });

        return res.status(200).json({ message: "Added to favorites" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in adding to favorites", error });
    }
}
exports.removeFavorite = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        // Check if the blog post exists
        const blogPost = await BlogPost.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        // Remove the postId from the user's favoriteBlogs array
        await User.findByIdAndUpdate(userId, { $pull: { favoriteBlogs: postId } });

        return res.status(200).json({ message: "Removed from favorites" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in removing from favorites", error });
    }
}

exports.getFavouriteBlogs = async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is in the route parameter

        // Find the user by userId and populate the favoriteBlogs array
        const user = await User.findById(userId).populate('favoriteBlogs');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract the favoriteBlogs from the populated user
        const favoriteBlogs = user.favoriteBlogs;

        return res.status(200).json({ favoriteBlogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in getting favorite blogs", error });
    }
}

