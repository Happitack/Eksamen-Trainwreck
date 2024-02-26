const jwt = require('jsonwebtoken');
require('dotenv').config();

// The authMiddleware function checks if the client has a valid JWT token in the Authorization header
module.exports = (req, res, next) => {
  try {
    // If the token is valid, the function calls the next middleware function
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    // The decoded token contains the user ID which is added to the request object
    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ error: 'Invalid request!' });
  }
};