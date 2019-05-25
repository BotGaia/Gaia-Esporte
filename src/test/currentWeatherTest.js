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
  	chai.request(app).get('/climate?place=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    chai.request(app).get('/climate?place=RUSBÉ UUUUUUH').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    chai.request(app).get('/climate?place=').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);

  it('should have name, sunrise and sunset', (done) => {
    chai.request(app).get('/climate?place=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('name');
      res.body.should.have.property('sunrise');
      res.body.should.have.property('sunset');
      done();
    });
  }).timeout(5000);
});
