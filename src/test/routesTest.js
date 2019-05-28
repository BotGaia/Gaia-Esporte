/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  it('Should get climate forecast', (done) => {
    const today = new Date();
    let day = (today.getDate() + 1).toString();
    let month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    if (month.length < 2) {
      month = `0${month}`;
    }
    chai.request(app).get(`/climateForecast?place=brasilia&date=${year}-${month}-${day}T01%3A27`).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);

  it('Should get all sports', (done) => {
    chai.request(app).get('/allSports').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Array');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    chai.request(app).get('/sports?place=RUSBÉ UUUUUUH').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);

  it('Should create notification', (done) => {
    const notification = {
      telegramId: 'testIDIDtest',
      days: [0, 3, 1],
      minutesBefore: 12,
      hoursBefore: 0,
      hour: 14,
      minutes: 0,
      sport: 'kitesurf',
      locals: ['brasilia', 'recife'],
    };
    chai.request(app).post('/createNotification').send(notification).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);

  it('Should create sport notification', (done) => {
    const today = new Date();
    let newDay = (today.getDate() + 1).toString();
    let newMonth = (today.getMonth() + 1).toString();
    const newYear = today.getFullYear().toString();
    if (newDay.length < 2) {
      newDay = `0${newDay}`;
    }
    if (newMonth.length < 2) {
      newMonth = `0${newMonth}`;
    }
    const notification = {
      days: [0, 3, 1],
      locals: ['brasilia', 'recife'],
      telegramId: 'testIDIDtest',
      sport: 'windsurf',
      hour: 14,
      minutes: 0,
      hoursBefore: 13,
      minutesBefore: 49,
      date: `${newYear}-${newMonth}-${newDay}Ts01:27:33.590Z`,
    };
    chai.request(app).post('/createNotification').send(notification).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});
