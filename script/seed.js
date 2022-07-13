'use strict';

const {
  db,
  models: { Movie, User, Party, UserRating, Genre, PartyRating },
} = require('../server/db');
const movieSeed = require('./movieSeed');
const userSeed = require('./userSeed');
const partySeed = require('./partySeed');
const userRatingSeed = require('./userRatingSeed');
const genreSeed = require('./genreSeed');
const partyRatingSeed = require('./partyRatingSeed');
const fs = require('fs');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  const movies = await Promise.all(
    movieSeed.map((item) => {
      return Movie.create(item);
    })
  );

  const users = await Promise.all(
    userSeed.map((item) => {
      return User.create(item);
    })
  );
  const parties = await Promise.all(
    partySeed.map((item) => {
      return Party.create(item);
    })
  );
  const userRatings = await Promise.all(
    userRatingSeed.map((item) => {
      return UserRating.create(item);
    })
  );
  const genres = await Promise.all(
    genreSeed.map((item) => {
      return Genre.create(item);
    })
  );

  const partyRatings = await Promise.all(
    partyRatingSeed.map((item) => {
      return PartyRating.create(item);
    })
  );

  console.log('tables seeded');

  await parties[0].addUsers([users[0], users[1], users[2], users[3]]);
  await parties[1].addUsers([users[0], users[1]]);
  await parties[2].addUser(users[0]);
  await parties[2].addUser(users[2]);
  await parties[0].addMovie(movies[0]);
  await parties[0].addMovie(movies[1]);
  await parties[0].addMovie(movies[121]);
  await parties[0].addMovie(movies[3213]);
  await parties[0].addMovie(movies[5663]);
  await parties[0].addMovie(movies[233]);
  await parties[0].addMovie(movies[9]);
  await parties[0].addMovie(movies[847]);
  await parties[0].addMovie(movies[7378]);
  await parties[1].addMovie(movies[0]);
  await parties[1].addMovie(movies[3]);
  await parties[1].addMovie(movies[4]);
  await parties[1].addMovie(movies[5]);
  await parties[1].addMovie(movies[6]);
  await parties[1].addMovie(movies[7]);
  await parties[2].addMovie(movies[8]);
  await parties[2].addMovie(movies[5433]);
  await parties[2].addMovie(movies[443]);
  await parties[2].addMovie(movies[665]);
  await parties[2].addMovie(movies[6764]);
  await parties[2].addMovie(movies[8664]);
  await users[0].addUserFriends([users[1], users[2], users[3]]);
  await users[0].addFriends([users[1], users[2], users[3]]);
  // await users[0].add;
  // console.log(users[0].__proto__);

  console.log('added associations');
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}
if (module === require.main) {
  runSeed();
}
module.exports = seed;
