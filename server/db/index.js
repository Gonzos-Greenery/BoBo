const db = require('./db');

const User = require('./models/User');
const Movie = require('./models/Movie');
const UserRating = require('./models/UserRating');
const Party = require('./models/Party');
const PartyRating = require('./models/PartyRating');
const Genre = require('./models/Genre');

User.hasMany(UserRating);
User.belongsToMany(Genre);
// User.belongsToMany(User, {as: 'friends', foreignKey: 'user_id', through: UsersFriends});
// User.belongsToMany(User, {as: 'userFriends', foreignKey: 'friend_id', through: UsersFriends});
User.belongsToMany(Party)
User.hasMany(PartyRating);
User.belongsToMany(Movie);
Movie.belongsToMany(User);
Movie.belongsToMany(Genre);
Movie.hasMany(UserRating);
Movie.hasMany(PartyRating);
Movie.belongsToMany(Party);
Party.belongsToMany(User);
Party.belongsToMany(Movie);
Party.hasMany(PartyRating);
UserRating.belongsTo(User);
UserRating.belongsTo(Movie);
PartyRating.belongsTo(Party);
PartyRating.belongsTo(Movie);
PartyRating.belongsTo(User);
Genre.belongsToMany(Movie);
Genre.belongsToMany(User)


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
