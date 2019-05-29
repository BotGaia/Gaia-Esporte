/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatTime = require('../utils/treatTimeUtil');

const should = chai.should();

describe('Treat Time', () => {
  it('Should get date time', (done) => {
    const time = treatTime.getDateTime();
    time.should.not.be.a('Float');
    done();
  }).timeout(5000);
});