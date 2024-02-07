const AboutUs = require('../models/AboutUs');
const { body, validationResult } = require('express-validator');

exports.getAboutUs = async (req, res) => {
  const aboutUs = await AboutUs.find();
  res.json(aboutUs);
};

exports.createAboutUs = async (req, res) => {
  const aboutUs = new AboutUs(req.body);
  await aboutUs.save();
  res.json(aboutUs);
};

exports.updateAboutUs = async (req, res) => {
  const aboutUs = await AboutUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(aboutUs);
};

exports.deleteAboutUs = async (req, res) => {
  await AboutUs.findByIdAndDelete(req.params.id);
  res.json({ message: 'About Us page deleted' });
};