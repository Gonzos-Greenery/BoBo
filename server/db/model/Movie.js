const Sequelize= require ('sequelize')
const db = require('../db');


const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,

  },
  imdb_id: {
    type: Sequelize.STRING,

  },
  genres: {
    type: Sequelize.STRING,

  },
  image:{
    type: Sequelize.STRING
  }
});

module.exports = Movie;
