const mongoose = require('mongoose');
const LocalSchema = require('../schemas/localSchema');

const LocalModel = mongoose.model('LocalModel', LocalSchema);

module.exports = class Local {
  constructor() {
    this.local = new LocalModel({
      name: '',
      latitude: '',
      longitude: '',
    });
  }

  setName(name) {
    this.local.name = name;
  }

  getName() {
    return this.local.name;
  }

  setLatitude(latitude) {
    this.local.latitude = latitude;
  }

  getLatitude() {
    return this.local.latitude;
  }

  setLongitude(longitude) {
    this.local.longitude = longitude;
  }

  getLongitude() {
    return this.local.longitude;
  }

  getLocal() {
    return this.local;
  }

  saveLocal() {
    if (this.local.latitude !== 'error' || this.local.longitude !== 'error') {
      this.local.save();
    }
  }

  findMe() {
    return new Promise((resolve) => {
      LocalModel.findOne({ name: this.local.name },
        (err) => { if (err) { resolve(false); } }).then((local) => {
        if (local) {
          this.local = local;
          resolve(true);
        }

        resolve(false);
      });
    });
  }
};
