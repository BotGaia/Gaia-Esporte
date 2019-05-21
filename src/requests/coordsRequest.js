const https = require('https');
const Local = require('../models/LocalModel');
const treat = require('../utils/localTreatmentUtil');

const key = process.env.API_KEY;

module.exports = {
  getLocales: (name) => {
    let data = '';
    let results;
    return new Promise((resolve) => {
      https.get(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${key}&language=pt-BR`, (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          results = treat.bodyToResultsArray(JSON.parse(data), name);
          resolve(results);
        });
      });
    });
  },

  getCoords: (name) => {
    const local = new Local(name);
    let data = '';
    let body;
    return new Promise((resolve) => {
      local.findMe().then((isFound) => {
        if (isFound) {
          resolve(local);
        } else {
          https.get(`https://api.opencagedata.com/geocode/v1/json?q=${name}&key=${key}`, (resp) => {
            resp.on('data', (chunk) => {
              data += chunk;
            });
            resp.on('end', () => {
              body = JSON.parse(data);
              treat.bodyToLocal(body, local);
              local.saveLocal();
              resolve(local);
            });
          });
        }
      });
    });
  },
};
