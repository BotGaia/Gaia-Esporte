const express = require('express');
const mongoose = require('mongoose');
const requestCoords = require('./requests/coordsRequest');
const endpoints = require('./utils/endpointsUtil');
const requestWeather = require('../src/requests/weatherRequest');
const Weather = require('../src/models/WeatherModel');
const comparation = require('./utils/compareSportWithWeatherUtil');
const hourlyForecast = require('./utils/hourlyForecastUtil');
const sportForecastRecommendation = require('./utils/sportForecastRecommendationUtil');
const treatNotification = require('./utils/treatNotificationUtil');
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
  const local = req.body.local;

    requestCoords.getCoords(local).then((coordsJson) => {
      requestWeather.getForecast(coordsJson).then(async (forecastJson) => {
        if (forecastJson.cod === '200') {
          const weatherArray = [];

          forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

          const result = await sportForecastRecommendation
            .getForecastRecommendation(weatherArray, req.body);
            console.log("result:")
            console.log(result)

            res.json(result);
        } else {
          res.json(forecastJson.list);
        }
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
  comparation.getAllSports().then((notifications) => {
    res.json(notifications);
  });
});

router.get('/allNotifications', (req, res) => {
  treatNotification.getAllNotifications().then((notifications) => {
    res.json(notifications);
  });
});

router.get('/userNotification', (req, res) => {
  NotificationModel.find({ telegramId: req.query.id }).then((notifications) => {
    res.json(notifications);
  });
});

router.get('/deleteNotification', (req, res) => {
  // eslint-disable-next-line no-restricted-globals
  if (!req.query.id || !req.query.number || isNaN(req.query.number)) {
    res.json('Parâmetro inválido, tente da seguinte maneira: id=telegramId&number=arrayNumber');
    return;
  }
  NotificationModel.find({ telegramId: req.query.id }).then((notifications) => {
    if (notifications.length <= 0) {
      res.json({});
      return;
    }

    NotificationModel.find(notifications[req.query.number]).then((isFound) => {
      if (isFound) {
        NotificationModel.deleteOne(notifications[req.query.number]).then(() => {
          res.json('Notificação excluída.');
        });
      } else {
        res.json('Erro ao encontrar a notificação, tente da seguinte maneira: id=telegramId&number=arrayNumber.');
        process.exit();
      }
    });
  });
});

router.post('/createNotification', (req, res) => {
  treatNotification.saveNotification(req.body).then((notification) => {
    res.send(notification);
  });
});

module.exports = app => app.use('/', router);
