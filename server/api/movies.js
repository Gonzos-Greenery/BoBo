const router = require('express').Router();
const {
  models: { User, Movie, Genre },
} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.findAll({limit: 400})
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

router.get('/:movieid', async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.movieid, {
      include: { model: Genre },
    });

    res.json(movie);
  } catch (error) {
    next(error);
  }
});



