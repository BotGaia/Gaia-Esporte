/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatment = require('../utils/treatmentWeatherUtil.js');
const compare = require('../utils/compareSportWithWeatherUtil');
const Sport = require('../models/SportModel');
const Interval = require('../models/IntervalModel');

const fakeWeather = { temperature: 1500, humidity: 2.0, windyspeed: 2.0 };
const should = chai.should();

describe('Compare current and favorable weather conditions', () => {
  it('should be equal or not', () => {
    const sport = new Sport('sportTest');
    const interval = new Interval('3000', '1000');
    sport.appendTemperatureInterval(interval);
    const tof = compare.compareTemperature(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });
});
