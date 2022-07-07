import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  genres: Array,
  imdb_id: String,
});

const Movie = mongoose.model("movie-limited", movieSchema);

export default Movie;
