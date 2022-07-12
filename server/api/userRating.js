const router = require('express').Router();
const {
  models: { UserRating, Movie, Genre, User },
} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;


/**post and get */

router.get('/:userid', async(req, res,next)=>{
  try {
    const ratings = await UserRating.findAll()
    res.json(ratings)
  } catch (error) {
    next(error)
  }
})

router.post('/add/:movieid/:userid', async(req, res, next)=>{
  try {
    const newRating= await UserRating.create(req.body);
    const movie= await Movie.findByPk(req.params.movieid);
    const user=await User.findByPk(req.params.userid);
    await newRating.setUser(user);
    await newRating.setMovie(movie);
    res.json(newRating)
  } catch (error) {
    next(error)
  }
})

