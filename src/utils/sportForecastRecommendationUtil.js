const hourlyForecast = require('./hourlyForecastUtil');
const Sport = require('../models/SportModel');
const compare = require('./compareSportWithWeatherUtil');

async function getForecastRecommendation(weatherArray, body) {
  let result;
  let date;

  if (body.hoursBefore !== 0) {
    date = new Date();
    date.setHours(body.hoursBefore);
    date.setMinutes(body.minutesBefore);
  }

  const weather = hourlyForecast
    .getHourlyForecast(
      weatherArray,
      date,
    );

  const sport = new Sport(body.sport);
  await sport.findMe();

  const recommendation = compare.compareWeather(sport.sport, weather);

  if (recommendation === 3) {
    result = { sportResult: 'favorable', weather };
  } if (recommendation === 2) {
    result = { sportResult: 'reservation', weather };
  } if (recommendation === 1) {
    result = { sportResult: 'alert', weather };
  } if (recommendation === 0) {
    result = { sportResult: 'not', weather };
  }

  return result;
}

module.exports = { getForecastRecommendation };
