const BlogPost=require("../Models/BlogPost");
exports.upload=async(req,res)=>{
    try{
        const newBlogPost=await BlogPost.create({
            ...req.body        });
        return res.status(200).json({message:"User Created",details:newBlogPost});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in upload",error})
    }

}
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

exports.removeBlog=async(req,res)=>{
    try{
        await BlogPost.deleteOne({_id:req.body.postId});
        return res.status(200).json({message:"removed blog"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error in getting removing blogs",error})
    }
}