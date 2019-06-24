/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const treatment = require('../utils/treatmentWeatherUtil.js');

const should = chai.should();

describe('Weather Treatment', () => {
  it('should treat temperature', (done) => {
    const tempKelvin = treatment.treatTemperature('332.98');
    tempKelvin.should.equal('59.83');
    done();
  }).timeout(5000);

  it('should treat sky', (done) => {
    const skyConditions = ['clear sky', 'few clouds', 'broken clouds', 'scattered clouds',
      'moderate rain', 'light rain', 'overcast clouds', 'light intensity', 'shower rain',
      'heavy snow', ''];
    const expectedConditions = ['céu limpo', 'poucas nuvens', 'céu parcialmente nublado',
      'nuvens dispersas', 'chuva moderada', 'leve chuva', 'céu nublado', 'sol forte',
      'chuva intensa', 'neve intensa', ''];

    for (let counter; counter < 11; counter += 1) {
      const returnedCondition = treatment.treatSky(skyConditions[counter]);

      returnedCondition.should.be.a('String').that.is.equal(expectedConditions[counter]);
    }

    done();
  }).timeout(5000);

  it('should treat pressure', (done) => {
    const hpaPressure = treatment.treatPressure('1025');
    hpaPressure.should.equal('1.01');
    done();
  }).timeout(5000);

  it('should treat wind', (done) => {
    const directions = ['leste', 'nordeste', 'norte', 'noroeste', 'oeste', 'sudoeste',
      'sul', 'sudeste'];
    const none = treatment.treatWind('none');
    let degrees = 0;

    directions.forEach((direction) => {
      const treatedDegrees = treatment.treatWind(degrees.toString());

      treatedDegrees.should.be.a('String').that.is.equal(direction);
      degrees += 45;
    });

    none.should.be.a('String').that.is.equal('');

    done();
  }).timeout(5000);

  it('should treat date', (done) => {
    const date = new Date(1561916771529);
    const expectedValues = ['sábado 6:52:09', 'sexta-feira 6:52:09', 'quinta-feira 6:52:09',
      'quarta-feira 6:52:09', 'terça-feira 6:52:09', 'segunda-feira 6:52:09', 'domingo 6:52:09'];

    for (let counter = 0; counter < 7; counter += 1) {
      const treatedDate = treatment.treatDate(date.getTime(), 'forecast');
      date.setDate(date.getDate() + 1);

      treatedDate.should.be.a('String').that.is.equal(expectedValues[counter]);
    }

    done();
  });

  it('should treat date', (done) => {
    const today = new Date(1561309569565 / 1000);
    today.setHours(0);
    const fakeClock = sinon.useFakeTimers(today.getTime());

    for (let counter = 0; counter < 3; counter += 1) {
      const treatedDate = treatment.treatDate(today.getTime(), 'weather');

      treatedDate.should.be.a('String');
      fakeClock.tick('01:00:00');
    }

    done();
    fakeClock.restore();
  }).timeout(5000);
});
