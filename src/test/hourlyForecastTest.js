/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const hourly = require('../utils/hourlyForecastUtil');

describe('Hourly Forecast', () => {
  it('Should return 1st item', () => {
    const date = new Date(Date.now());

    date.setHours(date.getHours() - 2);

    hourly.getHourlyForecast(
      [1, 2, 3, 4, 5, 6, 7],
      date,
    )
      .should
      .eql(1);
  });

  it('Should return 3 hours', () => {
    const date = new Date();

    hourly.getHoursAhead(
      date,
    )
      .should
      .eql(3);
  });


  it('Should return invalid 1', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    date.setFullYear(date.getFullYear() + 1);

    hourly.getHoursAhead(
      date,
    )
      .should
      .eql('invalid');
  });

  it('Should return invalid 1', () => {
    const date = new Date();
    date.setHours(date.getHours() - 4);

    hourly.getHoursAhead(
      date,
    )
      .should
      .eql('invalid');
  });
});
