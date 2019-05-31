/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('GET FORECAST', () => {
  it('should get a list of weather objects', (done) => {
    chai.request(app).get('/forecast?place=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    chai.request(app).get('/forecast?place=').end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.be.a('Object');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    chai.request(app).get('/forecast?place=RUSBÉ UUUUUUH').end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.be.a('Object');
      done();
    });
  }).timeout(5000);
});
