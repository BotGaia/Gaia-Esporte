const axios = require('axios');

module.exports = {
  getWeather: (local) => {
    const params = {
      lat: local.getLatitude(),
      lon: local.getLongitude(),
      appid: process.env.API_KEY_CLIMA,
    };

    return new Promise((resolve) => {
      axios.get('https://api.openweathermap.org/data/2.5/weather', { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },

  getForecast: (local) => {
    const params = {
      lat: local.getLatitude(),
      lon: local.getLongitude(),
      appid: process.env.API_KEY_CLIMA,
    };

    return new Promise((resolve) => {
      axios.get('https://api.openweathermap.org/data/2.5/forecast', { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },
};
