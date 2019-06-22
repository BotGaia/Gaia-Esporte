/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./db/sportMongooseConnectionDb');
const scheduler = require('./utils/schedulerUtil');
const environment = require('./config/environmentConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

environment.configGateway();

mongooseConnection.connect();

require('./routes')(app);

scheduler.dailySchedule();

app.listen(3000);

module.exports = app;
