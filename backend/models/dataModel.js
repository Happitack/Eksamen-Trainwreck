const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: {type: String, required: true},
  author : {type: String, required: false},
  date: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;