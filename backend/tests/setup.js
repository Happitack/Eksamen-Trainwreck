const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  global.mongod = new MongoMemoryServer();
  
  // Start the server for the in-memory database
  await global.mongod.start();

  const uri = await global.mongod.getUri();

  process.env.MONGO_URI = uri;
};