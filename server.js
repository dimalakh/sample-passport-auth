require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const routes = require('./routes/index');
const User = require('./models/user');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/exampledb', {
    useMongoClient: true
});

app.use(middlewares);
app.use('/', routes);

app.listen(port, () => {
    console.log(`running on ${port}`);
});

module.exports = app;
