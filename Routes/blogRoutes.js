const express=require("express");
const { upload, all } = require("../Controllers/blogController");



const router=express.Router();

router.post("/upload",upload);
router.get("/all",all);

module.exports=router;