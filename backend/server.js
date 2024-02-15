// Load environment variables
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Load third-party modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load middleware
const {errorHandler} = require('./middleware/errorHandler');

// Load MongoDB connection
const connectDB = require('./config/db');

// Load routes
const userRoutes = require('./routes/userRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const filmsRoutes = require('./routes/filmsRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Initialize express
const app = express(); 

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB()

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request received.`);
  next();
});

// Routing middleware
app.use('/', userRoutes)
app.use('/api/films', filmsRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/blog', blogRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});