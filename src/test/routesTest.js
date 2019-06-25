/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('Routes', () => {
  it('should get climate forecast', (done) => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    let day = tomorrow.getDate().toString();
    let month = (tomorrow.getMonth() + 1).toString();
    const year = tomorrow.getFullYear().toString();
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

  it('should get all sports', (done) => {
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

  it('should create notification', (done) => {
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

  it('should create a sport notification', (done) => {
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

  it('should get a sport notification', (done) => {
    chai.request(app).get('/userNotification')
      .query({ id: 'testIDIDtest' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf.at.least(1);
        done();
      });
  });

  it('should get all sport notifications', (done) => {
    chai.request(app).get('/allNotifications')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf.at.least(1);
        done();
      });
  });

  it('should delete a sport notification', (done) => {
    chai.request(app).get('/deleteNotification')
      .query({ id: 'testIDIDtest', number: '0' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('String').that.is.equal('Notificação excluída.');
        done();
      });
  });

  it('should get sports for a location', (done) => {
    chai.request(app).get('/sports')
      .query({ place: 'rio grande' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('favorable');
        done();
      });
  });

  it('should get a location forecast', (done) => {
    chai.request(app).get('/forecast')
      .query({ place: 'rio grande' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf.at.least(1);
        res.body[0].should.have.property('date');
        done();
      });
  });

  it('should get a location climate', (done) => {
    chai.request(app).get('/climate')
      .query({ place: 'rio grande' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('date');
        done();
      });
  });

  it('should get sports for a location', (done) => {
    chai.request(app).get('/listLocales')
      .query({ local: 'rio grande' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array').that.has.lengthOf.at.least(1);
        res.body[0].should.have.property('lat');
        done();
      });
  });

  it('should not get sport forecast', (done) => {
    chai.request(app).post('/sportForecast')
      .send({
        days: [
          1,
          5,
        ],
        local: 'praça do relógio',
        _id: '5d0d469947458b001d8dc999',
        class: 'notification',
        telegramId: '12455',
        sport: 'kitesurf',
        hour: 23,
        minutes: 12,
        hoursBefore: 2,
        minutesBefore: 11,
        date: '2019-06-21T18:05:29.247Z',
        __v: 0,
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('sportResult').eql('not');
        done();
      });
  });

  it('should get a location coordinates', (done) => {
    chai.request(app).get('/local')
      .query({ local: 'rio grande' }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        res.body.should.have.property('lat');
        done();
      });
  });
});
