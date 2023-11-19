const express=require("express");
const { upload } = require("../Controllers/blogController");



const router=express.Router();

router.post("/upload",upload);

module.exports=router;