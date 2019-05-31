const mongoose = require('mongoose');
const NotificationSchema = require('../schemas/notificationSchema');

const NotificationModel = mongoose.model('NotificationModel', NotificationSchema);

module.exports = class Notification {
  constructor(telegramId) {
    this.notification = new NotificationModel({
      class: 'notification',
      telegramId,
      sport: '',
      days: [],
      hour: 0,
      minutes: 0,
      locals: [],
      hoursBefore: 0,
      minutesBefore: 0,
      date: 0,
    });
  }

  setTelegramId(telegramId) {
    this.notification.telegramId = telegramId;
  }

  getTelegramId() {
    return this.notification.telegramId;
  }

  setHoursBefore(hoursBefore) {
    this.notification.hoursBefore = hoursBefore;
  }

  getHoursBefore() {
    return this.notification.hoursBefore;
  }

  setDate(date) {
    this.notification.date = new Date(date);
  }

  getDate() {
    return this.notification.date;
  }

  setMinutesBefore(minutesBefore) {
    this.notification.minutesBefore = minutesBefore;
  }

  getMinutesBefore() {
    return this.notification.minutesBefore;
  }

  setSport(sport) {
    this.notification.sport = sport;
  }

  getSport() {
    return this.notification.sport;
  }

  setDays(days) {
    this.notification.days = days;
  }

  getDays(index) {
    return this.notification.days[index];
  }

  getDaysArray() {
    return this.notification.days;
  }

  appendDay(weekday) {
    this.notification.days.push(weekday);
  }

  setTime(hour, minutes) {
    this.notification.hour = hour;
    this.notification.minutes = minutes;
  }

  getHour() {
    return this.notification.hour;
  }

  getMinutes() {
    return this.notification.minutes;
  }

  appendLocal(local) {
    this.notification.locals.push(local);
  }

  getLocal(index) {
    return this.notification.locals[index];
  }

  saveNotification() {
    return new Promise((resolve) => {
      this.notification.save().then(() => {
        resolve();
      });
    });
  }

  deleteMe() {
    return new Promise((resolve) => {
      NotificationModel.deleteOne({ telegramId: this.notification.telegramId },
        (err) => { if (err) { resolve(false); } }).then((notification) => {
        if (notification) {
          this.notification = notification;
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  findMe() {
    return new Promise((resolve) => {
      NotificationModel.findOne({ telegramId: this.notification.telegramId },
        (err) => { if (err) { resolve(false); } }).then((notification) => {
        if (notification) {
          this.notification = notification;
          resolve(true);
        }
        resolve(false);
      });
    });
  }
};
