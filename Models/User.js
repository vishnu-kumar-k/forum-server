const mongoose=require("mongoose");
const userSchema= mongoose.Schema({
    username:{
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
    userTypes:{
        type:String,
        default:"Student"
    },
    bio:{
        type:String,
        default:"None"
    }


})

const User= mongoose.model("User",userSchema);

module.exports=User;