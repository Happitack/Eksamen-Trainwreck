// models/blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    trim: true,
    maxlength: [100, 'Blog title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'An author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters']
  },
  summary: {
    type: String,
    required: [true, 'Blog summary is required'],
    trim: true,
    maxlength: [500, 'Blog summary cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Blog summary cannot be more than 5000 characters']
  },
  imageName: {
    type: String,
    required: [true, 'Image name is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);