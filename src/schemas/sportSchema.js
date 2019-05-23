const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  class: String,
  temperature: Array,
  humidity: Array,
  windSpeed: Array,
});

module.exports = SportSchema;
