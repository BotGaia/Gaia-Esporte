const Notification = require('../models/Notification');
const timeMath = require('./timeMath');


module.exports = {

  saveNotification: requestBody => new Promise((resolve) => {
    const notification = new Notification(requestBody.telegramId);
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
    notification.setSport(requestBody.sport);
    notification.setDate(date.getTime());

    requestBody.days.forEach((element) => {
      notification.appendDay(element);
    });

    requestBody.locals.forEach((element) => {
      notification.appendLocal(element);
    });

    notification.findMe().then(() => {
      notification.saveNotification().then(() => resolve(notification));
    });
  }),
};
