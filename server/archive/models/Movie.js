import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  genres: Array,
  imdb_id: String,
  production_countries: String,
  release_year: {type: Number},
  imdb_score: {type: Number}
});

const Movie = mongoose.model("movie", movieSchema);


export default Movie;
