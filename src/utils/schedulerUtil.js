const schedule = require('node-schedule');
const mongoose = require('mongoose');
const axios = require('axios');
const NotificationSchema = require('../schemas/notificationSchema');
const TreatTime = require('./treatTimeUtil');
const timeMath = require('./timeMathUtil');

const NotificationModel = mongoose.model('NotificationModel', NotificationSchema);

function getDailyNotifications(weekDay) {
  const dailyArray = [];
  return new Promise((resolve) => {
    NotificationModel.find({ class: 'notification' }).then((notificationArray) => {
      notificationArray.forEach((notification) => {
        notification.days.forEach((day) => {
          if (day === weekDay) {
            dailyArray.push(notification);
          }
        });
      });
      resolve(dailyArray);
    });
  });
}

function postNotification(notification) {
  return new Promise((resolve) => {
    const postUrl = `http://192.168.0.16:3002/`;
    axios.post(postUrl, notification).then((res) => {
      resolve(res.body);
    });
  });
}

async function makeSchedule(notification) {
  let job;
  const hour = timeMath.treatHour(notification.hour);
  const hourBefore = timeMath.treatHour(notification.hoursBefore);
  if (notification.minutesBefore || notification.hoursBefore) {
    job = schedule.scheduleJob(`${(notification.minutesBefore).toString()} ${(hourBefore).toString()} * * *`, () => {
      postNotification(notification);
      job.cancel();
    });
  } else if (notification.minutes) {
    job = schedule.scheduleJob(`${(notification.minutes).toString()} ${(hour).toString()} * * *`, () => {
      postNotification(notification);
      job.cancel();
    });
  }
}

function scheduleOne(notification) {
  const weekDay = TreatTime.getDateTime();
  const date = new Date();
  date.setHours(date.getHours() - 3);
  if (notification.days) {
    notification.days.forEach((day) => {
      if (day === weekDay) {
        if (notification.minutesBefore !== 0 || notification.hoursBefore !== 0) {
          if (notification.hoursBefore >= date.getHours()) {
            if (notification.minutesBefore > date.getMinutes()) {
              makeSchedule(notification);
            }
          }
        } else if (notification.hour >= date.getHours()) {
          if (notification.minutes > date.getMinutes()) {
            makeSchedule(notification);
          }
        }
      }
    });
  }
}

function notificationSchedule() {
  const weekDay = TreatTime.getDateTime();

  getDailyNotifications(weekDay).then((dailyArray) => {
    for (let i = 0; i < dailyArray.length; i += 1) {
      makeSchedule(dailyArray[i]);
    }
  });
}

function dailySchedule() {
  schedule.scheduleJob('0 0 3 * * *', () => {
    notificationSchedule();
  });
}

module.exports = {
  dailySchedule,
  postNotification,
  makeSchedule,
  getDailyNotifications,
  notificationSchedule,
  scheduleOne,
};
