/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatment = require('../utils/treatmentWeatherUtil.js');
const compareUtil = require('../utils/compareSportWithWeatherUtil');
const Sport = require('../models/SportModel');
const Interval = require('../models/IntervalModel');

const fakeWeather = { temperature: 1500, humidity: 2.0, windySpeed: 2.0 };
const should = chai.should();
const { expect } = chai;

describe('Compare current and favorable weather conditions', () => {
  it('should have temperature equal or not', () => {
    const sport = new Sport('sportTest1');
    const interval = new Interval('3000', '1000');
    sport.appendTemperatureInterval(interval);
    const tof = compareUtil.compareTemperature(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });

  it('should have humidity equal or not', () => {
    const sport = new Sport('sportTest2');
    const interval = new Interval('3000', '1000');
    sport.appendHumidityInterval(interval);
    const tof = compareUtil.compareHumidity(sport.getSport(), fakeWeather);
    tof.should.be.equal(false);
  });

  it('should have wind speed equal or not', () => {
    const sport = new Sport('sportTest3');
    const interval = new Interval('3000', '1000');
    sport.appendWindSpeedInterval(interval);
    const tof = compareUtil.compareWindSpeed(sport.getSport(), fakeWeather);
    tof.should.be.equal(false);
  });

  it('should compare sport with weather', () => {
    const sport = new Sport('sportTest4');
    const interval = new Interval('3000', '1000');
    sport.appendWindSpeedInterval(interval);
    const tof = compareUtil.compareWeather(sport.getSport(), fakeWeather);
    tof.should.be.equal(0);
  });

  it('should compare all sports with weather', () => {
    compareUtil.compare(fakeWeather).then((array) => {
      array.should.not.be.equal('Array');
    });
  });

  it('should compare weather', (done) => {
    const leol = new Sport('leol');
    leol.appendTemperatureInterval(new Interval('5000', '-5000'));
    leol.appendHumidityInterval(new Interval('5000', '-5000'));
    leol.appendWindSpeedInterval(new Interval('5000', '-5000'));

    const comparison = compareUtil.compareWeather(leol.getSport(), fakeWeather);

    comparison.should.be.a('Number').that.is.equal(3);
    done();
  });

  it('should divide the recommendations array', (done) => {
    const leol = new Sport('leol');
    leol.appendTemperatureInterval(new Interval('5000', '-5000'));
    leol.appendHumidityInterval(new Interval('5000', '-5000'));
    leol.appendWindSpeedInterval(new Interval('5000', '-5000'));

    const notLeol = new Sport('notLeol');
    notLeol.appendTemperatureInterval(new Interval('1', '0'));
    notLeol.appendHumidityInterval(new Interval('5000', '-5000'));
    notLeol.appendWindSpeedInterval(new Interval('5000', '-5000'));

    const notLeolAsWell = new Sport('notLeolAsWell');
    notLeolAsWell.appendTemperatureInterval(new Interval('1', '0'));
    notLeolAsWell.appendHumidityInterval(new Interval('1', '0'));
    notLeolAsWell.appendWindSpeedInterval(new Interval('5000', '-5000'));

    const sportArray = [leol.getSport(), notLeol.getSport(), notLeolAsWell.getSport()];
    const dividedRecommendations = compareUtil.divideRecommendationArrays(sportArray,
        fakeWeather);

    dividedRecommendations.should.be.a('Object');
    dividedRecommendations.should.have.property('favorable').that.has.lengthOf(1);
    dividedRecommendations.should.have.property('reservation').that.has.lengthOf(1);
    dividedRecommendations.should.have.property('alert').that.has.lengthOf(1);
    done();
  });
});
