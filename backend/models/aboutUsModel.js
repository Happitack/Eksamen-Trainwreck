// models/AboutUs.js
const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);