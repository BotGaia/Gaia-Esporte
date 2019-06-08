const mongoose = require('mongoose');
const Notification = require('../models/NotificationModel');
const timeMath = require('./timeMathUtil');
const NotificationSchema = require('../schemas/notificationSchema');
const scheduler = require('../utils/schedulerUtil');

const NotificationModel = mongoose.model('NotificationModel', NotificationSchema);

module.exports = {

  saveNotification: requestBody => new Promise((resolve) => {
    const notification = new Notification();
    const date = new Date();
    date.setHours(date.getHours() - 3);

    if (requestBody.minutesBefore !== 0 || requestBody.hoursBefore !== 0) {
      const { hour: userHours } = requestBody;
      const { minutes: userMinutes } = requestBody;
      const { minutesBefore: minBefore } = requestBody;
      const { hoursBefore: hourBefore } = requestBody;
      const targetTime = timeMath.getTargetTime(userHours, userMinutes, minBefore, hourBefore);
      notification.setHoursBefore(targetTime[0]);
      notification.setMinutesBefore(targetTime[1]);
    }
    notification.setTime(requestBody.hour, requestBody.minutes);
    notification.setTelegramId(requestBody.telegramId);
    notification.setSport(requestBody.sport);
    notification.setDate(date.getTime());

    requestBody.days.forEach((element) => {
      notification.appendDay(element);
    });

    requestBody.locals.forEach((element) => {
      notification.appendLocal(element);
    });

    NotificationModel.find({
      telegramID: notification.getTelegramId(),
      days: notification.getDays(),
      minutesbefore: notification.getMinutesBefore(),
      hoursBefore: notification.getHoursBefore(),
      hour: notification.getHour(),
      minutes: notification.getMinutes(),
      sport: notification.getSport(),
      locals: notification.getLocal(),
    }).then(() => {
      notification.saveNotification().then(() => {
        scheduler.scheduleOne(notification);
        resolve(notification);
      });
    });
  }),

  getAllNotifications: () => new Promise((resolve) => {
    NotificationModel.find({ class: 'notification' }).then((array) => {
      resolve(array);
    }).catch(() => {
    });
  }),
};
