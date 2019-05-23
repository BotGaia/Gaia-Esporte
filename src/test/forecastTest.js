/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const requestWeather = require('../requests/weatherRequest');
const requestCoords = require('../requests/coordsRequest');

const should = chai.should();

chai.use(chaiHttp);

describe('GET FORECAST', () => {
  it('should get a list of weather objects', (done) => {
    requestCoords.getCoords().then((local) => {
      requestWeather.getForecast(local).then((forecastJson) => {
        forecastJson.should.be.a('Object');
        forecastJson.should.have.property('cod').eql('200');
        done();
      });
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    requestCoords.getCoords('').then((local) => {
      requestWeather.getForecast(local).then((forecastJson) => {
        forecastJson.should.be.a('Object');
        forecastJson.should.have.property('cod').eql('400');
        done();
      });
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    requestCoords.getCoords('RUSBÉ UUUUUUH').then((local) => {
      requestWeather.getForecast(local).then((forecastJson) => {
        forecastJson.should.be.a('Object');
        forecastJson.should.have.property('cod').eql('400');
        done();
      });
    });
  }).timeout(5000);
});
