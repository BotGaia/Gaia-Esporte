const mongoose = require('mongoose');
const Sport = require('../models/SportModel');
const SportSchema = require('../schemas/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);

module.exports = {
  saveSports(sports) {
    sports.forEach((element) => {
      const sport = new Sport(element.name);
      element.temperatureInterval.forEach((interval) => {
        sport.appendTemperatureInterval(interval);
      });
      element.humidityInterval.forEach((interval) => {
        sport.appendHumidityInterval(interval);
      });
      element.windSpeedInterval.forEach((interval) => {
        sport.appendWindSpeedInterval(interval);
      });
      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport();
        }
      });
    });
  },

  deleteAllSports() {
    return new Promise((resolve) => {
      SportModel.deleteMany({ class: 'sport' }).then(() => {
        resolve();
      });
    });
  },
};
