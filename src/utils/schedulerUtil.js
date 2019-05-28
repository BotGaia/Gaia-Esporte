const schedule = require('node-schedule');
const mongoose = require('mongoose');
const axios = require('axios');
const NotificationSchema = require('../schemas/notificationSchema');
const TreatTime = require('./treatTimeUtil');

const NotificationModel = mongoose.model('NotificationModel', NotificationSchema);

function getDailyNotifications(weekDay) {
  const dailyArray = new Array([]);
  return new Promise((resolve) => {
    NotificationModel.find({ class: 'notification' }).then((notificationArray) => {
      notificationArray.forEach((notification) => {
        notification.days.forEach((day) => {
          if (day === weekDay) {
            dailyArray.push(day);
          }
        });
      });
    });
    resolve(dailyArray);
  });
}


function postNotification(notification) {
  return new Promise((resolve) => {
    const postUrl = `${global.URL_CLIMATE}/notifyUser`;

    axios.post(postUrl, notification.notification).then((res) => {
      resolve(res.body);
    });
  });
}

async function makeSchedule(notification) {
  if (notification.minutesBefore || notification.hoursBefore) {
    schedule.scheduleJob(`${(notification.minutesBefore).toString()} ${(notification.hoursBefore + 3).toString()} * * *`, () => {
      postNotification(notification);
    });
  } else if (notification.minutes) {
    schedule.scheduleJob(`${(notification.minutes).toString()} ${(notification.hours + 3).toString()} * * *`, () => {
      postNotification(notification);
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
};
