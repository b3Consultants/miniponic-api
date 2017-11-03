'use strict';

const controller = require('../controllers/data.controller');
const express = require('express');

const router = express.Router();

router.post('/saveData/:mpid', controller.create);
router.get('/getData/:mpid/limit/:limit', controller.get);

module.exports = router;
