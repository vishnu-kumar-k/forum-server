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
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
  content:{
    type:String,
    required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true }); 

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
