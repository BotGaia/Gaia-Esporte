/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatNotification = require('../utils/treatNotificationUtil');


describe('Notification', () => {
  it('should save a notification', (done) => {
    const requestBody = {
      telegramId: 'testId38',
      sport: 'testSport',
      days: [8],
      hour: 12,
      minutes: 30,
      locals: 'Fabrica do Papai Noel',
      hoursBefore: 0,
      minutesBefore: 15,
    };

    treatNotification.saveNotification(requestBody).then((notification) => {
      notification.getTelegramId().should.eql('testId38');
      notification.getSport().should.eql('testSport');
      done();
    });
  }).timeout(5000);

  it('should get all notifications', (done) => {
    treatNotification.getAllNotifications().then((notifications) => {
      notifications.should.be.a('Array');
      done();
    });
  });
});
