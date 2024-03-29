const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Film title is required'],
    trim: true,
    maxlength: [100, 'Film title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Film description is required'],
    trim: true,
    maxlength: [500, 'Film description cannot be more than 500 characters']
  },
  releaseDate: {
    type: String,
    required: [true, 'Film release date is required']
  },
  imageName: {
    type: String,
    required: [true, 'Image name is required']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Film', filmSchema)