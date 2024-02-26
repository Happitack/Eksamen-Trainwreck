const mongoose = require('mongoose');

// The function uses the mongoose.connect method to connect to the MongoDB database using the MONGO_URI environment variable
const connectDB = async () => {
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, an error message is printed to the console and the process is terminated
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
// The connectDB function is exported

module.exports = connectDB;