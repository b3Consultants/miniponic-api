'use strict';

const Repos = require('../repos/repos');
const Data = require('../models/data');

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
    const { mpid } = req.params;
    Repos.isRegisted(mpid)
    .then((resolve) => {
      if (resolve) {
        Data.find({}).sort({'timestamp': -1}).limit(5).exec((error, data) => {
          if (error) return res.status(400).send('Error Getting Data');
          return res.status(200).json(data)
        });
      } else {
        res.status(404).send('Miniponic Not Found');
      }
    });
  },
};
