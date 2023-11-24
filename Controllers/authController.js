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
        sendMail(email,subject,content);
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

exports.follow = async (req, res) => {
    try {
      const { userId, personId } = req.body;
  
      // Check if the user and person exist
      const user = await User.findById(userId);
      const person = await User.findById(personId);
  
      if (!user || !person) {
        return res.status(404).json({ message: 'User or person not found' });
      }
  
      // Check if the user is already following the person
      if (user.following.includes(personId)) {
        return res.status(400).json({ message: 'Already following the person' });
      }
  
      // Update the user's following array and person's followers array
      user.following.push(personId);
      person.followers.push(userId);
  
      await user.save();
      await person.save();
  
      return res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  exports.unfollow = async (req, res) => {
    try {
      const { userId, personId } = req.body;
  
      // Check if the user and person exist
      const user = await User.findById(userId);
      const person = await User.findById(personId);
  
      if (!user || !person) {
        return res.status(404).json({ message: 'User or person not found' });
      }
  
      // Check if the user is already following the person
      if (!user.following.includes(personId)) {
        return res.status(400).json({ message: 'Not following the person' });
      }
  
      // Update the user's following array and person's followers array
      user.following = user.following.filter((id) => id.toString() !== personId);
      person.followers = person.followers.filter((id) => id.toString() !== userId);
  
      await user.save();
      await person.save();
  
      return res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  };

  
  exports.getFollowers = async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Check if the user exists
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Populate the followers array with user details
      const followers = await User.find({ _id: { $in: user.followers } });
  
      return res.status(200).json({ followers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  };