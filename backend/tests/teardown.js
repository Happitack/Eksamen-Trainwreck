module.exports = async () => {
  try {
    // Try to get the connection string
    await global.mongod.getConnectionString();
    
    // If the server is running, stop it
    await global.mongod.stop();
  } catch (error) {
    // If an error is thrown, the server is not running and we don't need to do anything
  }
};