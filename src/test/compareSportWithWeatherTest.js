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
const { expect } = chai;

describe('Compare current and favorable weather conditions', () => {
  it('should have temperature equal or not', () => {
    const sport = new Sport('sportTest1');
    const interval = new Interval('3000', '1000');
    sport.appendTemperatureInterval(interval);
    const tof = compare.compareTemperature(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });

  it('should have humidity equal or not', () => {
    const sport = new Sport('sportTest2');
    const interval = new Interval('3000', '1000');
    sport.appendHumidityInterval(interval);
    const tof = compare.compareHumidity(sport.getSport(), fakeWeather);
    tof.should.be.equal(false);
  });

  it('should have wind speed equal or not', () => {
    const sport = new Sport('sportTest3');
    const interval = new Interval('3000', '1000');
    sport.appendWindSpeedInterval(interval);
    const tof = compare.compareWindSpeed(sport.getSport(), fakeWeather);
    tof.should.be.equal(false);
  });

  it('should compare sport with weather', () => {
    const sport = new Sport('sportTest4');
    const interval = new Interval('3000', '1000');
    sport.appendWindSpeedInterval(interval);
    const tof = compare.compareWeather(sport.getSport(), fakeWeather);
    tof.should.be.equal(0);
  });

  it('should compare all sports with weather', () => {
    compare.compare(fakeWeather).then((array) => {
      array.should.not.be.equal('Array');
    });
  });
});
