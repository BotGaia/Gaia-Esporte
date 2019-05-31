/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('List', () => {
  it('Should get Latitude', (done) => {
    chai.request(app).get('/listLocales?local=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      res.body[0].should.have.property('lat').eql(-10.3333333);
      done();
    });
  }).timeout(5000);

  it('Should get Longitude', (done) => {
    chai.request(app).get('/listLocales?local=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      res.body[0].should.have.property('lng').eql(-53.2);
      done();
    });
  }).timeout(5000);
});

describe('Coords', () => {
  it('Should get Latitude', (done) => {
    chai.request(app).get('/local?local=parana').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('lat').eql('-24.4842187');
      done();
    });
  }).timeout(5000);

  it('Should get Longitude', (done) => {
    chai.request(app).get('/local?local=parana').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('lng').eql('-51.8148872');
      done();
    });
  }).timeout(5000);
});
