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