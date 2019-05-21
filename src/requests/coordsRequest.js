const axios = require('axios');
const Local = require('../models/LocalModel');
const treat = require('../utils/localTreatmentUtil');

module.exports = {
  getLocales: (name) => {
    const params = {
      q: name,
      key: process.env.API_KEY_LOCAL,
      language: 'pt-BR',
    };

    return new Promise((resolve) => {
      axios.get('https://api.opencagedata.com/geocode/v1/json?', { params })
        .then((response) => {
          const results = treat.bodyToResultsArray(response.data, name);
          resolve(results);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },

  getCoords: (name) => {
    const local = new Local(name);
    const params = {
      q: name,
      key: process.env.API_KEY_LOCAL,
      language: 'pt-BR',
    };
    return new Promise((resolve) => {
      
      local.findMe().then((isFound) => {
        if (isFound) {
          resolve(local);
        } else {
          axios.get('https://api.opencagedata.com/geocode/v1/json', { params })
            .then((response) => {
              treat.bodyToLocal(response.data, local);
              local.saveLocal();
              resolve(local);
            }).catch((err) => {
              resolve(err);
            });
        }
      });
    });
  },
};
