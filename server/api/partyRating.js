const router = require('express').Router();
const {
  models: { PartyRating, Movie, Party, User },
} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;

/**post and get */

router.get('/:partyid', async (req, res, next) => {
  try {
    const ratings = await PartyRating.findAll();
    res.json(ratings);
  } catch (error) {
    next(error);
  }
});

router.post('/add/:movieid/:partyid/:userid', async (req, res, next) => {
  try {
    const newRating = await PartyRating.create(req.body);
    const movie = await Movie.findByPk(req.params.movieid);
    const user = await User.findByPk(req.params.userid);
    const party = await Party.findByPk(req.params.partyid);
    await newRating.setUser(user);
    await newRating.setMovie(movie);
    await newRating.setParty(party);
    res.json(newRating);
  } catch (error) {
    next(error);
  }
});
