const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', userController.signup);
// routes the client's POST request to the userController.login function
router.post('/login', userController.login);

// gets user profile data from the database and sends it to the client as a JSON response
// the authMiddleware function is called before the userController.getProfile function
// the authMiddleware function checks if the client has a valid JWT token in the Authorization header
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;