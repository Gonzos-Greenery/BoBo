const Sequelize = require('sequelize');
const db = require('../db');

const UserRating = db.define('userRating', {
  rating: {
    type: Sequelize.INTEGER,
  },
  watchAgain: {
    type: Sequelize.BOOLEAN,
  },
  wantToWatch: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = UserRating;
