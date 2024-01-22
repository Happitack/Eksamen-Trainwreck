const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/dataRoutes');
const app = express(); 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Trainwreck');

// MongoDB connection object
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected successfully to MongoDB database.');
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request received.`);
  next();
});

// Routing middleware
app.use(express.json());
app.use('/', routes);