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

module.exports = Party;
