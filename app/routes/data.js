'use strict';

const controller = require('../controllers/data.controller');
const express = require('express');

const router = express.Router();

router.post('/saveData/:mpid', controller.create);
router.get('/getData/:mpid/limit/:limit', controller.get);
router.get('/getPhoto/:mpid', controller.getPhoto);
router.post('/savePhoto/:mpid', controller.createPhoto);
router.post('/delete/:mpid/limit/:limit', controller.delete);

module.exports = router;
