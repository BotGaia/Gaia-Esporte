const mongoose = require('mongoose');

const LocalSchema = new mongoose.Schema({
  name: String,
  latitude: String,
  longitude: String,
});

module.exports = LocalSchema;
