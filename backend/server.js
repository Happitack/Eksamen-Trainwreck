// Load environment variables
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Load third-party modules
const express = require('express');
const mongoose = require('mongoose');

// Load middleware
const {errorHandler} = require('./middleware/errorHandler');

// Load MongoDB connection
const connectDB = require('./config/db');

// Load routes
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const filmsRoutes = require('./routes/filmsRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Initialize express
const app = express(); 

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
app.use('/api/films', filmsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});