const mongoose = require('mongoose');
const SportSchema = require('../schemas/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);

function compare(weather) {
  return new Promise((resolve) => {
    this.getAllSports().then((array) => {
      resolve(this.divideRecommendationArrays(array, weather));
    });
  });
}

function divideRecommendationArrays(array, weather) {
  let count = 0;
  const objectOfSports = { favorable: [], reservation: [], alert: [] };
  for (let i = 0; i < array.length; i += 1) {
    if (this.compareTemperature(array[i], weather)) {
      count += 1;
    }
    if (this.compareHumidity(array[i], weather)) {
      count += 1;
    }
    if (this.compareWindSpeed(array[i], weather)) {
      count += 1;
    }
    if (count === 3) {
      objectOfSports.favorable.push(array[i]);
    } else if (count === 2) {
      objectOfSports.reservation.push(array[i]);
    } else if (count === 1) {
      objectOfSports.alert.push(array[i]);
    }
    count = 0;
  }
  return objectOfSports;
}

function getAllSports() {
  return new Promise((resolve) => {
    SportModel.find({ class: 'sport' }).then((array) => {
      resolve(array);
    }).catch(() => {
    });
  });
}

function compareWeather(sport, weather) {
  let recommendationLevel = 0;
  if (this.compareHumidity(sport, weather)) {
    recommendationLevel += 1;
  }
  if (this.compareTemperature(sport, weather)) {
    recommendationLevel += 1;
  }
  if (this.compareWindSpeed(sport, weather)) {
    recommendationLevel += 1;
  }

  return recommendationLevel;
}

function compareTemperature(sport, weather) {
  for (let i = 0; i < sport.temperature.length; i += 1) {
    if (parseFloat(weather.temperature) >= parseFloat(sport.temperature[i].lowerLimit)
      && parseFloat(weather.temperature)
      <= parseFloat(sport.temperature[i].upperLimit)) {
      return true;
    }
  }
  return false;
}

function compareHumidity(sport, weather) {
  for (let i = 0; i < sport.humidity.length; i += 1) {
    if (parseFloat(weather.humidity) >= parseFloat(sport.humidity[i].lowerLimit)
      && parseFloat(weather.humidity) <= parseFloat(sport.humidity[i].upperLimit)) {
      return true;
    }
  }
  return false;
}

function compareWindSpeed(sport, weather) {
  for (let i = 0; i < sport.windSpeed.length; i += 1) {
    if (parseFloat(weather.windySpeed) >= parseFloat(sport.windSpeed[i].lowerLimit)
      && parseFloat(weather.windySpeed) <= parseFloat(sport.windSpeed[i].upperLimit)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  compare,
  divideRecommendationArrays,
  getAllSports,
  compareWeather,
  compareTemperature,
  compareHumidity,
  compareWindSpeed,
};
