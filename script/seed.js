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

  await parties[2].addUser(users[0], { through: { host: true } });

  await parties[0].addUsers([users[0], users[1], users[2], users[3]]);
  await parties[1].addUser(users[1], { through: { host: true } });
  await parties[1].addUser(users[1]);
  await parties[2].addUsers(users[2], { through: { host: true } });
  await parties[0].addMovies([
    movies[0],
    movies[1],
    movies[121],
    movies[3213],
    movies[5663],
    movies[233],
    movies[9],
    movies[847],
    movies[7378],
  ]);
  await parties[1].addMovies([
    movies[0],
    movies[3],
    movies[4],
    movies[5],
    movies[6],
    movies[7],
  ]);
  await parties[2].addMovies([movies[8], [5433], [443], [665], [6764], [8664]]);
  await users[0].addUserFriends([users[1], users[2], users[3]]);
  await users[0].addFriends([users[1], users[2], users[3]]);
  await users[1].addUserFriend(users[3]);
  await users[1].addFriend(users[3]);
  
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
