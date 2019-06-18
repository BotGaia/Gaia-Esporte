const Sport = require('../models/SportModel');

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
};
