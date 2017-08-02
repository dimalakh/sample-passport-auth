const bodyParser = require('body-parser');
const express = require('express');
const passportMiddleware = require('./passport');
const middlewares = express.Router({ mergeParams: true }); // eslint-disable-line

middlewares.use(bodyParser.urlencoded({ extended: true }));
middlewares.use(bodyParser.json());
passportMiddleware; // eslint-disable-line

module.exports = middlewares;
