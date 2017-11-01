'use strict';

const db = require('../../config/registered_miniponics.json');

module.exports = {
  // check if miniponic exists
  isRegisted(mpid) {
    return new Promise(
        (resolve) => {
          if (db.miniponics.indexOf(mpid) > -1) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
  },
};
