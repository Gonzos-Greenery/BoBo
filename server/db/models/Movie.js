const Sequelize = require('sequelize');
const db = require('../db');

const Movie = db.define('movie', {
  kaggle_id: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  dup: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  release_year: {
    type: Sequelize.INTEGER,
  },
  age_certification: {
    type: Sequelize.STRING,
  },
  runtime: {
    type: Sequelize.INTEGER,
  },
  imdb_id: {
    type: Sequelize.STRING,
  },
  genres_arr: {
    type: Sequelize.STRING,
  },
  production_countries: {
    type: Sequelize.STRING,
  },
  seasons: {
    type: Sequelize.STRING,
  },
  imdb_score: {
    type: Sequelize.DOUBLE,
  },
  imdb_votes: {
    type: Sequelize.DOUBLE,
  },
  tmdb_popularity: {
    type: Sequelize.DOUBLE,
  },
  tmdb_score: {
    type: Sequelize.DOUBLE,
  },
  hulu: {
    type: Sequelize.BOOLEAN,
  },
  netflix: {
    type: Sequelize.BOOLEAN,
  },
  prime: {
    type: Sequelize.BOOLEAN,
  },
  disney: {
    type: Sequelize.BOOLEAN,
  },
  hbo: {
    type: Sequelize.BOOLEAN,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Movie;
