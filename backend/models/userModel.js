const mongoose = require('mongoose');

// The UserSchema defines the structure of the user collection
// The user collection stores the username and password of the users
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);