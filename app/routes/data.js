'use strict';

const controller = require('../controllers/data.controller');
const express = require('express');

const router = express.Router();

/* GET home page. */
router.post('/saveData/:mpid', controller.create);
router.get('/getData/:mpid', controller.get);

module.exports = router;
