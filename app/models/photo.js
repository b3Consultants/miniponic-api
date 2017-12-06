'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('photos', {
  id: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: '',
  },
});
