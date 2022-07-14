const db = require('./db');

const User = require('./models/User');
const Movie = require('./models/Movie');
const UserRating = require('./models/UserRating');
const Party = require('./models/Party');
const PartyRating = require('./models/PartyRating');
const Genre = require('./models/Genre');

User.hasMany(UserRating);
User.belongsToMany(Genre, { through: 'UserGenre' });
User.belongsToMany(User, {as: 'friends', foreignKey: 'user_id', through: 'UsersFriends'});
User.belongsToMany(User, {as: 'userFriends', foreignKey: 'friend_id', through: 'UsersFriends'});
User.belongsToMany(Party, { through: 'UserParties' });
User.hasMany(PartyRating);
User.belongsToMany(Movie, { through: 'UserMovies' });
User.belongsToMany(Genre, { through: 'UserGenres' });
Movie.belongsToMany(User, { through: 'UserMovies' });
Movie.belongsToMany(Genre, { through: 'MovieGenres' });
Movie.hasMany(UserRating);
Movie.hasMany(PartyRating);
Movie.belongsToMany(Party, { through: 'MovieParties' });
Party.belongsToMany(User, { through: 'UserParties' });
Party.belongsToMany(Movie, { through: 'MovieParties' });
Party.hasMany(PartyRating);
UserRating.belongsTo(User);
UserRating.belongsTo(Movie);
PartyRating.belongsTo(Party);
PartyRating.belongsTo(Movie);
PartyRating.belongsTo(User);
Genre.belongsToMany(Movie, { through: 'MovieGenres' });
Genre.belongsToMany(User, { through: 'UserGenres' });

module.exports = {
  db,
  models: {
    User,
    Movie,
    UserRating,
    Party,
    PartyRating,
    Genre,
  },
};
