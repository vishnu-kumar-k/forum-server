const express=require("express");
const { signup, login, follow, unfollow } = require("../Controllers/authController");



const router=express.Router();

router.post("/signup",signup);
router.post("/login",login)
router.post("/follow",follow);
router.post("/unfollow",unfollow);
module.exports=router;