const Sequelize= require ('sequelize')
const db = require('../db');


const Party = db.define('party', {
  date: {
    type: Sequelize.DATE,
  },
});

module.exports = Party;
