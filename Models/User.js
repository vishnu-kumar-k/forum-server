const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
    },
    phone: {
        type: String,
    },
    userTypes: {
        type: String,
        default: "Student"
    },
    bio: {
        type: String,
        default: "None"
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favoriteBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost' // Assuming you have a Blog model
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost' // Assuming you have a Post model
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
