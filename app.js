'use strict';

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const database = require('./config/database'); // load the database config
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Miniponic = require('./app/index');
const Data = require('./app/routes/data.js');

const port = 8082;

const app = express();

mongoose.connect(database.localUrl);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(metrics.metrics.getAll(req.query.reset));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const server = http.createServer(app);

app.use('/', Miniponic);
app.use('/data', Data);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Miniponic App rocking the shit out of you on port ${port}!`);
});
