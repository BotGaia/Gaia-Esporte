const express = require('express');
const mongoose = require('mongoose');
const requestCoords = require('./requests/coordsRequest');
const endpoints = require('./utils/endpointsUtil');
const requestWeather = require('../src/requests/weatherRequest');
const Weather = require('../src/models/WeatherModel');
const comparation = require('./utils/compareSportWithWeatherUtil');
const hourlyForecast = require('./utils/hourlyForecastUtil');
const sportForecastRecommendation = require('./utils/sportForecastRecommendationUtil');
const saveNotification = require('./utils/notificationSaveUtil');
const Notification = require('../src/models/NotificationModel');
const NotificationSchema = require('../src/schemas/notificationSchema');

const NotificationModel = mongoose.model('NotificationModel', NotificationSchema);
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

router.get('/climateForecast', (req, res) => {
  requestCoords.getCoords(req.query.place).then((coordsJson) => {
    requestWeather.getForecast(coordsJson).then((forecastJson) => {
      const date = new Date(req.query.date);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(date.getTime()) || date instanceof Date === false) {
        res.json('Formato inválido! Tente da seguinte maneira: AAAA-MM-DD. Formato do horário: THH%3AMM');
      } else if (forecastJson.cod === '200') {
        const weatherArray = [];

        forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));
        res.json(
          hourlyForecast
            .getHourlyForecast(weatherArray, new Date(req.query.date)),
        );
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.post('/sportForecast', (req, res) => {
  const resultArray = [];
  let i = 0;
  req.body.locals.forEach((local) => {
    requestCoords.getCoords(local).then((coordsJson) => {
      requestWeather.getForecast(coordsJson).then(async (forecastJson) => {
        if (forecastJson.cod === '200') {
          const weatherArray = [];

          forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

          const resultItem = await sportForecastRecommendation
            .getForecastRecommendation(weatherArray, req.body);

          resultArray.push(resultItem);
          i += 1;

          if (i === req.body.locals.length) {
            res.json(resultArray);
          }
        } else {
          res.json(forecastJson.list);
        }
      });
    });
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

router.get('/allNotifications', (req, res) => {
  saveNotification.getAllNotifications().then((array) => {
    res.json(array);
  });
});

router.get('/userNotification', (req, res) => {
  NotificationModel.find({ telegramId: req.query.id }).then((array) => {
    res.json(array);
  });
});

router.get('/deleteNotification', (req, res) => {
  NotificationModel.find({ telegramId: req.query.id }).then((isFound) => {
    if (isFound) {
      NotificationModel.deleteMe().then(() => {
      res.send("Notificação excluída");
      });
    }
    else {
      process.exit();
    }
  });
});

router.post('/createNotification', (req, res) => {
  saveNotification.saveNotification(req.body).then((notification) => {
    res.send(notification.notification);
  });
});

module.exports = app => app.use('/', router);
