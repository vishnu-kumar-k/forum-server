const User=require("../Models/User");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const sendMail = require("../mailer");
exports.signup=async(req,res)=>{
    try{
        console.log("Hitting")
        console.log(req.body);
        const user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({message:"user already exist"});
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const newUser=await User.create({
            ...req.body,
            password:hashedPassword
        });
        return res.status(200).json({message:"User Created",details:newUser});
        
    }
    catch(error){
        return res.status(500).json({message:"Internal error",error});
    }

}

exports.login=async(req,res)=>{
    try{
        console.log("Hitting")
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        const {email,password}=req.body;
        const userDetails=await User.findOne({email});
        const match=await bcrypt.compare(password,userDetails.password);
        if(!match){
            return res.status(400).json({message:"Invalid Password"});
        }
        const subject="New Login Found"
        const content=`<p> A new Device has been logged in to your account from  ${ipAddress} IP Address and from ${userAgent}</p>`
        sendMail(email,content,subject);
        return res.status(200).json({message:"Logged In",details:userDetails});

    }
    catch(err){
        return res.status(500).json({message:"login error",error:err});
    }

}

exports.logout=async(req,res)=>{
    try{
        res.clearCookie("jwtToken");
        return res.status(200).json({message:"Success"})

    }
    catch(err){
        return res.status(500).json({message:"Some thing went wrong",error:err});
    }
}