/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const scheduler = require('../utils/schedulerUtil');
const treatTime = require('../utils/treatTimeUtil');

const should = chai.should();

describe('Scheduler', () => {
  it('should get date time', () => {
    const weekDay = treatTime.getDateTime();
    weekDay.should.be.within(0, 6);
  });

  it('should get daily notifications', (done) => {
    scheduler.getDailyNotifications(15).then((notificationArray) => {
      notificationArray.length.should.be.eql(0);
      done();
    });
  });

  it('should make schedule', (done) => {
    scheduler.makeSchedule({ time: '' }).then((nothing) => {
      none = nothing;
      if (none) {
        none = 1;
      } else {
        none = 0;
      }

      none.should.be.eql(0);
      done();
    });
  });

  it('should schedule a notification', (done) => {
    scheduler.notificationSchedule();
    done();
  });

  it('should schedule daily', (done) => {
    scheduler.dailySchedule();
    done();
  }).timeout(5000);
});
