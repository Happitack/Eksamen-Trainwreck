const bcrypt = require('bcrypt');
const User = require('../models/userModel');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.sendStatus(200);
};

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    // User authenticated successfully, generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.jwtSecret, { expiresIn: '1h' });
    // Send the token back to the client
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};