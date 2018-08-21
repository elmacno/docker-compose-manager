const JsonDB = require('node-json-db');

const db = new JsonDB('dcm', true, true);

module.exports = {
  db
};
