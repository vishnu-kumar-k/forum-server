const express=require("express");
const { AddLogin, GetAdmin, DeleteAdmin, GetUsers, DeleteUser, DeletePost, AdminLogin } = require("../Controllers/AdminController");

const router=express.Router();

router.post("/addadmin",AddLogin);
router.get("/getadmin",GetAdmin)
router.post("/deleteadmin",DeleteAdmin)
router.get("/getusers",GetUsers)
router.post("/deleteuser",DeleteUser)
router.post("/deletepost",DeletePost)
router.post("/login",AdminLogin)
module.exports=router;