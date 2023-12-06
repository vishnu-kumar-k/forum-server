const express=require("express");
const { signup, login, follow, unfollow, getFollowers, getNotifications, updateUserDetails, getFollowing } = require("../Controllers/authController");



const router=express.Router();

router.post("/signup",signup);
router.post("/login",login)
router.post("/follow",follow);
router.post("/unfollow",unfollow);
router.post("/getfollowers",getFollowers);
router.post("/getfollowing",getFollowing);
router.post('/notifications',getNotifications)
router.post('/updateprofile',updateUserDetails);

module.exports=router;