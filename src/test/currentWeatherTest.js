/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const requestWeather = require('../requests/weatherRequest');
const Weather = require('../models/WeatherModel');
const requestCoords = require('../requests/coordsRequest');

const should = chai.should();
chai.use(chaiHttp);

describe('GET WEATHER', () => {
  it('should get a weather object', (done) => {
    requestCoords.getCoords('brasilia').then((local) => {
      requestWeather.getWeather(local).then((weatherJson) => {
        weatherJson.should.be.a('Object');
        weatherJson.should.have.property('cod').eql(200);
        done();
      });
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    requestCoords.getCoords('RUSBÉ UUUUUUH').then((local) => {
      requestWeather.getWeather(local).then((weatherJson) => {
        weatherJson.should.be.a('Object');
        weatherJson.should.have.property('cod').eql('400');
        done();
      });
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    requestCoords.getCoords('').then((local) => {
      requestWeather.getWeather(local).then((weatherJson) => {
        weatherJson.should.be.a('Object');
        weatherJson.should.have.property('cod').eql('400');
        done();
      });
    });
  }).timeout(5000);

  it('should have name, sunrise and sunset', (done) => {
    requestCoords.getCoords('brasilia').then((local) => {
      requestWeather.getWeather(local).then((weatherJson) => {
        weatherJson.should.be.a('Object');
        weatherJson.should.have.property('name');
        weatherJson.should.have.property('sunrise');
        weatherJson.should.have.property('sunset');
        done();
      });
    });
  }).timeout(5000);
});
