const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};