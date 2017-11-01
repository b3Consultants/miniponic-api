'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('datas', {
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: {},
  },
  timestamp: {
    type: Date,
    default: '',
  },
});
