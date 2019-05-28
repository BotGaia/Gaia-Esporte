const mongoose = require('mongoose');
const SportSchema = require('../schemas/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);

module.exports = class Sport {
  constructor(name) {
    this.sport = new SportModel({
      name,
      class: 'sport',
      temperature: [],
      humidity: [],
      windSpeed: [],
    });
  }

  appendTemperatureInterval(interval) {
    this.sport.temperature.push(interval);
  }

  appendHumidityInterval(interval) {
    this.sport.humidity.push(interval);
  }

  appendwindSpeedInterval(interval) {
    this.sport.windSpeed.push(interval);
  }

  getSport() {
    return this.sport;
  }

  saveSport() {
    return new Promise((resolve) => {
      this.sport.save().then(() => {
        resolve();
      });
    });
  }

  deleteMe() {
    return new Promise((resolve, reject) => {
      SportModel.deleteOne({ name: this.sport.name }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  findMe() {
    return new Promise((resolve) => {
      SportModel.findOne({ name: this.sport.name },
        (err) => { if (err) { resolve(false); } }).then((sport) => {
        if (sport) {
          this.sport = sport;
          resolve(true);
        }
        resolve(false);
      });
    });
  }
};
