import axios from 'axios';
const localhost = 'http://localhost:8080'
// Action constants
const SET_MOVIES = 'SET_MOVIES';

// Action creators
const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies,
  };
};

const editMovies = async (info) => {
  const genres = {
      action: [],
      animation: [],
      comedy: [],
      crime: [],
      documentation: [],
      drama: [],    
      european: [],
      family: [],
      fantasy: [],
      history: [],
      horror: [],
      music: [],
      romance: [],
      scifi: [],
      thriller: [],
      war: [],
      western: [],
  }
  
  const newMovies = await Promise.all(info.map(movie => {
      const imdbId = movie.imdb_id;
      const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
      const BASE_URL = "https://api.themoviedb.org/3";

      const API_URL =
          BASE_URL +
          `/find/${imdbId}?` +
          API_KEY +
          "&language=en-US&external_source=imdb_id";
      const IMG_URL = "https://image.tmdb.org/t/p/w500";
      
      let res = fetch(API_URL)
      .then(res => res.json())
      .then(({movie_results}) => {
        if(movie_results && movie_results.length>0 && movie_results[0] && movie_results[0].poster_path){
          movie.image = `${IMG_URL + movie_results[0].poster_path}`
          return movie
        } else {
          movie.image = "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg"
          return movie
        }
      })
      .catch(e => console.log(e))
      return res
  }))
  console.log(newMovies)
  for(let type in genres){
    const filteredMovies = newMovies.filter(movie => movie.genres_arr.includes(type))
    genres[type] = filteredMovies;
  }
  return {
    all: newMovies,
    sort: genres
  }
}
// Thunks

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method:'get',
        url: `${localhost}/api/movies`
      })
      let movies = await editMovies(data)
      console.log(movies)
      dispatch(setMovies(movies));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies;
    default:
      return state;
  }
};

