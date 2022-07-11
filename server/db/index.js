const db = require('./db');

const User = require('./models/User');
const Movie = require('./models/Movie');
const UserRating = require('./models/UserRating');
const Party = require('./models/Party');
const PartyRating = require('./models/PartyRating');
const Genre = require('./models/Genre');

User.hasMany(UserRating);
User.hasMany(Genre);
User.belongsToMany(User, {as: 'friends', foreignKey: 'user_id', through: UsersFriends});
User.belongsToMany(User, {as: 'userFriends', foreignKey: 'friend_id', through: UsersFriends});
User.belongsToMany(Party)
User.hasMany(PartyRating);
Movie.hasMany(Genre);
Movie.hasMany(UserRating);
Movie.hasMany(PartyRating);
Movie.belongsToMany(Party);
Party.belongsToMany(User);
Party.belongsToMany(Movie);
Party.hasMany(PartyRating);



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
