const mongoose=require("mongoose");
const userSchema= mongoose.Schema({
    userName:{
        type:String,
        require:true
    }  ,
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    DOB:{
        type:Date,
    },
    phone:{
        type:String,
    },
    userType:{
        type:String,
        default:"Student"
    }


})

const User= mongoose.model("User",userSchema);

module.exports=User;