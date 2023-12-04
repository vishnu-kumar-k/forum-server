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
        ref: 'BlogPost'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    }],
    notifications: [{
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
