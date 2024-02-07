const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const filmsRoutes = require('./routes/filmsRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const PORT = process.env.PORT || 4000;
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
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});