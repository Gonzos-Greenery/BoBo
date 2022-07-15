const Sequelize = require('sequelize');
const db = require('../db');

const Party = db.define('party', {
  name: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
  },
});

const UserParties = db.define('UserParties', {
  host: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { Party, UserParties };
