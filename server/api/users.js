const router = require('express').Router();
const {
  models: { User, Movie, Genre },
} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'username',
        'email',
        'hulu',
        'netflix',
        'prime',
        'disney',
        'hbo',
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:userid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      include: [
        { model: User, as: 'friends' },
        { model: Genre },
        { model: Movie },
      ],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/update/:userid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    await user.update(req.body.user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/username/:username', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: { username: req.params.username },
      attributes: [
        'id',
        'name',
        'username',
        'email',
        'hulu',
        'netflix',
        'prime',
        'disney',
        'hbo',
      ],
    });
    const userGenres = await user.getGenres();
    user.genres = userGenres;
    console.log(user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/movieswatched/:userid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      include: [{ model: Movie }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/movieswatched/add/:userid/:movieid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    const movie = await Movie.findByPk(req.params.movieid);
    await user.addMovie(movie);
    await movie.addUser(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/genres/add/:userid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    for (let genres in req.body.genres) {
      if (req.body.genres[genres]) {
        let genre = await Genre.findOne({ where: { title: [genres] } });
        await user.addGenre(genre);
      }
    }
    const updatedUser = await User.findByPk(req.params.userid, {
      include: [{ model: Genre }],
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/movieswatched/register/add/:userid/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    const movies = await Movie.findAll({
      where: {
        id: {
          [Sequelize.Op.or]: [...req.body.movies],
        },
      },
    });
    await Promise.all(
      movies.map((movie) => {
        user.addMovie(movie);
      })
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/addFriend/:userid/:friendid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    const friend = await User.findByPk(req.params.friendid);
    await user.addFriend(friend);
    await user.addUserFriend(friend);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/removeFriend/:userid/:friendid', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    const friend = await User.findByPk(req.params.friendid);
    await user.removeFriend(friend);
    await user.removeUserFriend(friend);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
