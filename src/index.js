/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./db/sportMongooseConnectionDb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnection.connect();

require('./routes')(app);

app.listen(3000);

module.exports = app;
