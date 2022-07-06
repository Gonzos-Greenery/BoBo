import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  genres: Array,
});

const Movie = mongoose.model('movie', movieSchema);

export default Movie;
