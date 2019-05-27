/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const treatment = require('../utils/treatmentWeatherUtil.js');

const should = chai.should();

describe('GET ATTRIBUTES', () => {
  it('should get Temperature', (done) => {
    const tempKelvin = treatment.treatTemperature('332.98');
    tempKelvin.should.equal('59.83');
    done();
  }).timeout(5000);

  it('should get Sky', (done) => {
    const skyWeather = treatment.treatSky('clear sky');
    skyWeather.should.equal('céu limpo');
    done();
  }).timeout(5000);

  it('should get Pressure', (done) => {
    const hpaPressure = treatment.treatPressure('1025');
    hpaPressure.should.equal('1.01');
    done();
  }).timeout(5000);

  it('should get Wind', (done) => {
    const direction = treatment.treatWind('300');
    direction.should.equal('sudeste');
    done();
  }).timeout(5000);

  it('should get Sunrise', (done) => {
    const hours = treatment.treatSun('1555917368');
    hours.should.equal('4:16:08');
    done();
  }).timeout(5000);

  it('should get Date time', (done) => {
    const date = treatment.treatDate('1555917368');
    date.should.equal('segunda-feira 4:16:08');
    done();
  }).timeout(5000);
});
