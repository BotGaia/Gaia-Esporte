const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  class: String,
  telegramId: String,
  sport: String,
  days: Array,
  hour: Number,
  minutes: Number,
  local: String,
  hoursBefore: Number,
  minutesBefore: Number,
  date: Date,
});

module.exports = NotificationSchema;
