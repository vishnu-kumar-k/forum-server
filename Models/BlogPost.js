const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    headerImageUrl: {
        type: String,
        required: true,
    },
    footerImageUrl: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    likes: {
        type: [String], // Array of strings
        default: [],    // Default value is an empty array
    },
    date:{
        type:Date,
        default:Date.now,
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        username:{
            type:String,
        }
    }],
    author: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
