const { check, validationResult } = require('express-validator');
const Newsletter = require('../models/newsletterModel');

// @desc    Validate subscribe request
// @route   POST /api/newsletter/subscribe
exports.validateSubscribe = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
];

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
exports.subscribe = [
  ...exports.validateSubscribe, // Spread the validation rules
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
        .json({ errors: errors.array() });
    }

    try {
      const emailExists = await Newsletter.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ error: 'Email is already subscribed' });
      }
      const newsletter = new Newsletter({ email: req.body.email });
      await newsletter.save();
      res.json({ message: 'Email subscribed successfully!' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Could not subscribe email' });
    }
  }
];

// @desc    Validate unsubscribe request
// @route   DELETE /api/newsletter/unsubscribe
exports.validateUnsubscribe = [
  check('email').isEmail().withMessage('Please provide a valid email address'),
];

// @desc    Unsubscribe from newsletter
// @route   DELETE /api/newsletter/unsubscribe
exports.unsubscribe = [
  ...exports.validateUnsubscribe, // Spread the validation rules
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const emailExists = await Newsletter.findOne({ email: req.body.email });
      if (!emailExists) {
        return res.status(400).json({ error: 'Email is not subscribed' });
      }

      await Newsletter.deleteOne({ email: req.body.email });
      res.json({ message: 'Email unsubscribed successfully!' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Could not unsubscribe email' });
    }
  }
];