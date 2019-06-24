/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Sport = require('../models/SportModel');
const Interval = require('../models/IntervalModel');
const sportForecast = require('../utils/sportForecastRecommendationUtil');
const compare = require('../utils/compareSportWithWeatherUtil');
const mongooseConnection = require('../db/sportMongooseConnectionDb');

const should = chai.should();

describe('Sport and Interval Models', () => {
  it('should have sports saved', (done) => {
    new Sport('sportTest2').findMe().then((isFound) => {
      isFound.should.be.equal(true);
      done();
    });
  });

  it('should save sports', (done) => {
    sport = new Sport('sportTest2');
    sport.saveSport().then(() => {
      sport.findMe().then((isFound) => {
        isFound.should.be.equal(true);
        done();
      });
    });
  });

  it('should create a sport named sport with temperature of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendTemperatureInterval(interval);
      sport.getSport().temperature.length.should.be.equal(1);
    });
  });

  it('should create a sport named sport with humidity of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendHumidityInterval(interval);
      sport.getSport().humidity.length.should.be.equal(1);
    });
  });

  it('should create a sport named sport with wind speed of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendWindSpeedInterval(interval);
      sport.getSport().temperature.length.should.be.equal(1);
    });
  });

  it('should have sport forecast recommendation', () => {
    const fakeWeather = { temperature: '1500', humidity: '2.0', windySpeed: '2.0' };
    const fakeBody = { date: '2019-05-31T01:27:33.590Z', sport: 'sportTest' };
    const recommendation = sportForecast.getForecastRecommendation(fakeWeather, fakeBody);
    recommendation.should.not.be.equal('Array');
  });

  it('should have all sports', (done) => {
    compare.getAllSports().then((comparison) => {
      comparison.should.be.a('Array');
      done();
    });
  });
});
