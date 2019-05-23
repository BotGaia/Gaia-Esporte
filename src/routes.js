const express = require('express');
const requestCoords = require('./requests/coordsRequest');
const endpoints = require('./utils/endpointsUtil');
const requestWeather = require('../src/requests/weatherRequest');
const Weather = require('../src/models/WeatherModel');
const comparation = require('./utils/compareSportWithWeatherUtil');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.get('/local', (req, res) => {
  requestCoords.getCoords(req.query.local).then((value) => {
    res.json({
      lat: value.getLatitude(),
      lng: value.getLongitude(),
    });
  }).catch((err) => {
    res.send(err);
  });
});

router.get('/listLocales', (req, res) => {
  requestCoords.getLocales(req.query.local).then((value) => {
    res.json(value);
  }).catch((err) => {
    res.send(err);
  });
});

router.get('/climate', (req, res) => {
  requestCoords.getCoords(req.query.place).then((local) => {
    requestWeather.getWeather(local).then((weatherJson) => {
      if (weatherJson.cod === 200) {
        const weather = new Weather(weatherJson, 'weather');
        res.json(weather);
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/forecast', (req, res) => {
  requestCoords.getCoords(req.query.place).then((local) => {
    requestWeather.getForecast(local).then((forecastJson) => {
      if (forecastJson.cod === '200') {
        const weatherArray = [];

        forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

        res.json(weatherArray);
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.get('/sports', (req, res) => {
  requestCoords.getCoords(req.query.place).then((coordsJson) => {
    requestWeather.getWeather(coordsJson).then((weatherJson) => {
      if (weatherJson.cod === 200) {
        const weather = new Weather(weatherJson);
        comparation.compare(weather).then((objectOfSports) => {
          res.json(objectOfSports);
        });
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/allSports', (req, res) => {
  comparation.getAllSports().then((array) => {
    res.json(array);
  });
});

module.exports = app => app.use('/', router);
