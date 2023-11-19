const express=require("express");
const { upload, all, myBlogs,removeBlog } = require("../Controllers/blogController");



const router=express.Router();

router.post("/upload",upload);
router.get("/all",all);
router.post("/myblogs",myBlogs);
router.post("/removeblog",removeBlog);

module.exports=router;