const express=require("express");

const authRoutes=require("./authRoutes");
const blogRoutes=require("./blogRoutes");
const AdminRoutes=require("./AdminRoutes");

const router=express.Router();

router.use("/auth",authRoutes);
router.use("/blog",blogRoutes);
router.use("/admin",AdminRoutes)
module.exports=router;