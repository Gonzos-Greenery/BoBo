const router = require("express").Router();
const {
  models: { User, Movie, Genre },
} = require("../db");
const Sequelize = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "hulu",
        "netflix",
        "prime",
        "disney",
        "hbo",
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:userid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      include: [{ model: Genre }, { model: Movie }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/username/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: [
        "id",
        "name",
        "username",
        "email",
        "hulu",
        "netflix",
        "prime",
        "disney",
        "hbo",
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/movieswatched/:userid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      include: [{ model: Movies }],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/movieswatched/add/:userid/:movieid", async (req, res, next) => {
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

router.put("/genres/add/:userid/:genreid", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userid);
    const genre = await Genre.findByPk(req.params.genreid);
    await user.addGenre(genre);
    await genre.addUser(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/movieswatched/register/add/:userid/:moviei",
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userid);
      console.log(req.body);
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
          movie.addUser(user);
        })
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
