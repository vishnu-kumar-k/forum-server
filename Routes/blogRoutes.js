const express=require("express");
const { upload, all, myBlogs,removeBlog, addFavourite, getFavouriteBlogs, removeFavorite } = require("../Controllers/blogController");



const router=express.Router();

router.post("/upload",upload);
router.get("/all",all);
router.post("/myblogs",myBlogs);
router.post("/removeblog",removeBlog);
router.post("/addfavourite",addFavourite);
router.post("/removefavourite",removeFavorite);
router.post("/getfavourites",getFavouriteBlogs);
module.exports=router;