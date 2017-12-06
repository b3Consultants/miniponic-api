'use strict';

const Repos = require('../repos/repos');
const Data = require('../models/data');
const Photo = require('../models/photo');

// add new miniponic data
module.exports = {
  create(req, res) {
    const { mpid } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        const data = req.body.data;
        const timestamp = req.body.timestamp;
        Data.create({
          id: mpid,
          data,
          timestamp,
        }, (error) => {
          if (error) return res.status(400).send('Error Adding Data');
          return res.status(200).send('Data Added Correctly');
        });
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },
  get(req, res) {
    const { mpid, limit } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        Data.find({}).sort({'timestamp': -1}).limit(parseInt(limit)).exec((error, data) => {
          if (error) return res.status(400).send('Error Getting Data');
          const dataToSend = data.map(value => ({
            temperature: value.data.temperature,
            humidity: value.data.humidity,
            luminosity: value.data.luminosity,
            timestamp: value.timestamp
          }));
          return res.status(200).json(dataToSend)
        });
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },
  getPhoto(req, res) {
    const { mpid } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        Photo.find({}).sort({'timestamp': -1}).limit(1).exec((error, data) => {
          if (error) return res.status(400).send(error);
          return res.status(200).json(data[0].photo)
        });
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },

  createPhoto(req, res) {
    const { mpid } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        const photo = req.body.photo;
        const timestamp = req.body.timestamp;
        Photo.create({
          id: mpid,
          photo,
          timestamp,
        }, (error) => {
          if (error) return res.status(400).send(error);
          return res.status(200).send('Photo Added Correctly');
        });
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },
  delete(req, res) {
    const { mpid, limit } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        Data.find({}).sort({'timestamp': -1}).limit(parseInt(limit)).remove().exec();
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },
};
