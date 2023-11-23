const BlogPost=require("../Models/BlogPost");
const UploadFile = require("../s3");
exports.upload=async(req,res)=>{
    try{
        const {headerImage,footerImage,headerImageType,footerImageType, title,description,author,userId}=req.body;
        const headerImageUrl=await UploadFile(headerImage,author,headerImageType);
        const footerImageUrl=await UploadFile(footerImage,author,footerImageType);
        console.log(headerImageUrl);
        console.log(footerImageUrl);
        const newBlogPost=await BlogPost.create({
            title,description,author,userId,headerImageUrl,footerImageUrl        });
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