/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const timeMath = require('../utils/timeMathUtil');

describe('Time Math', () => {
  it('Calculate hours and minutes', (done) => {
    const targetTime = timeMath.getTargetTime(1, 0, 40, 2);
    targetTime[0].should.eql(22);
    targetTime[1].should.eql(40);
    done();
  }).timeout(5000);
});
