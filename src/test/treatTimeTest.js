/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const treatTime = require('../utils/treatTimeUtil');

const should = chai.should();

describe('Treat Time', () => {
  it('should get date time', (done) => {
    const today = new Date(1561309569565);
    today.setHours(0);
    const fakeClock = sinon.useFakeTimers(today.getTime());

    for (let counter = 0; counter < 3; counter += 1) {
      treatTime.getDateTime().should.be.a('Number').that.is.equal(today.getDay() - 1);
      fakeClock.tick('01:00:00');
    }

    done();
    fakeClock.restore();
  }).timeout(5000);

  it('Should get date info', (done) => {
    const time = treatTime.getDateInfo();
    time.should.not.be.a('Float');
    done();
  }).timeout(5000);
});
