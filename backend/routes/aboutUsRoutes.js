const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

// Routes for handling data requests
router.route('/get')
    .get(aboutUsController.getAboutUs);

// Route to update about us page
router.route('/update/:id')
    .put(aboutUsController.validateAboutUs, aboutUsController.updateAboutUs);

module.exports = router;