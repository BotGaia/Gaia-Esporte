/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Notification = require('../models/NotificationModel');

describe('Notification test', () => {
  it('new Notification()', () => {
    const notification = new Notification('testId60');
    notification.setTelegramId('testId61');
    notification.getTelegramId().should.eql('testId61');
  });

  it('appends', () => {
    const notification = new Notification('testId689');
    notification.appendDay('test');
    notification.setSport('test');
    notification.setLocal('test');
    notification.setHoursBefore(0);
    notification.setMinutesBefore(0);

    notification.getDays(0).should.eql('test');
    notification.getSport().should.eql('test');
    notification.getMinutes().should.eql(0);
    notification.getHour().should.eql(0);
    notification.getLocal().should.eql('test');
    notification.getHoursBefore().should.eql(0);
    notification.getMinutesBefore().should.eql(0);
  });
});
