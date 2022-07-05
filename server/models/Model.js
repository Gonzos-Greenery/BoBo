import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  genres: Array,
});

const userSchema = new Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
});

const Movie = mongoose.model('movie', movieSchema);
export const User = mongoose.model('user', userSchema);

export default Movie;

