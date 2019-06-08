/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Scheduler = require('../utils/schedulerUtil');
const TreatTime = require('../utils/treatTimeUtil');

const should = chai.should();

describe('Scheduler test', () => {
  it('getDateTime()', () => {
    const weekDay = TreatTime.getDateTime();
    weekDay.should.be.within(0, 6);
  });

  it('getDailyNotifications()', (done) => {
    Scheduler.getDailyNotifications(15).then((notificationArray) => {
      notificationArray.length.should.be.eql(0);
      done();
    });
  });

  it('makeSchedule()', (done) => {
    Scheduler.makeSchedule({ time: '' }).then((nothing) => {
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
});
