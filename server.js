require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

const middlewares = require('./middlewares');
const routes = require('./routes/index');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/exampledb', {
    useMongoClient: true
});

app.use(middlewares);
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running on ${port}`); //eslint-disable-line 
});

module.exports = app;
