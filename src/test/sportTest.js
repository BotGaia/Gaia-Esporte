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

describe('Validate database', () => {
  it('should have sports saved', (done) => {
    new Sport('sportTest2').findMe().then((isFound) => {
      isFound.should.be.equal(true);
      done();
    });
  });
});

describe('Save in database', () => {
  it('should save sports', (done) => {
    sport = new Sport('sportTest2');
    sport.saveSport().then(() => {
      sport.findMe().then((isFound) => {
        isFound.should.be.equal(true);
        done();
      });
    });
  });
});

describe('Create Sport with temperature condition', () => {
  it('Should create a sport named sport with temperature of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendTemperatureInterval(interval);
      sport.getSport().temperature.length.should.be.equal(1);
    });
  });
});

describe('Create Sport with humidity condition', () => {
  it('Should create a sport named sport with humidity of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendHumidityInterval(interval);
      sport.getSport().humidity.length.should.be.equal(1);
    });
  });
});

describe('Create Sport with windy speed condition', () => {
  it('Should create a sport named sport with wind speed of length 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendWindSpeedInterval(interval);
      sport.getSport().temperature.length.should.be.equal(1);
    });
  });

  describe('Sport Forecast Recommendation', () => {
    it('should have sport forecast recommendation', () => {
      const fakeWeather = { temperature: '1500', humidity: '2.0', windySpeed: '2.0' };
      const fakeBody = { date: '2019-05-31T01:27:33.590Z', sport: 'sportTest' };
      const recommendation = sportForecast.getForecastRecommendation(fakeWeather, fakeBody);
      recommendation.should.not.be.equal('Array');
    });
  });
  describe('All Sports', () => {
    it('should have all sports', () => {
      compare.getAllSports();
      compare.should.not.be.equal('Array');
    });
  });
});
