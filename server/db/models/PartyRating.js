const Sequelize= require ('sequelize')
const db = require('../db');


const PartyRating = db.define('partyRating', {
  rating: {
    type: Sequelize.INTEGER,
  },
  
});

module.exports = PartyRating;
