const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.sendStatus(200);
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    // User authenticated successfully, generate a JWT token that expires in 1 hour
    // Secret key is read from the environment variable jwtSecret which should not be hard-coded in the final application
    const token = jwt.sign({ id: user._id }, process.env.jwtSecret, { expiresIn: '1h' });
    // Send the token back to the client 
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
};

// gets user profile data from the database and sends it to the client as a JSON response
// the authMiddleware function is called before the userController.getProfile function to check if the client has a valid JWT token in the Authorization header
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};