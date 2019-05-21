const express = require('express');
const requestCoords = require('./requests/coordsRequest');
const endpoints = require('./utils/endpointsUtil');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

router.get('/local', (req, res) => {
  requestCoords.getCoords(req.query.address).then((value) => {
    res.json({
      lat: value.getLatitude(),
      lng: value.getLongitude(),
    });
  }).catch((err) => {
    res.send(err);
  });
});

router.get('/listLocales', (req, res) => {
  requestCoords.getLocales(req.query.address).then((value) => {
    res.json(value);
  }).catch((err) => {
    res.send(err);
  });
});

module.exports = app => app.use('/', router);
