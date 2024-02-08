const AboutUs = require('../models/AboutUs');
const { body, validationResult } = require('express-validator');

// @desc    Get about us page
// @route   GET /api/about-us/get
exports.getAboutUs = async (req, res) => {
  const aboutUs = await AboutUs.find();
  res.json(aboutUs);
};

exports.validateAboutUs = [
  body('title').not().isEmpty().withMessage('Title is required').trim().isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('description').not().isEmpty().withMessage('Description is required').trim().isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters'),
];

// @desc    Update about us page
// @route   PUT /api/about-us/update/:id
exports.updateAboutUs = [
  ...exports.validateAboutUs, 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const aboutUs = await AboutUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(aboutUs);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
];