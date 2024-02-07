const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);