import axios from 'axios';
const url = 'https://bobo-server.herokuapp.com';

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
  };
  // for (let type in genres) {
  //   const filteredMovies = info.filter((movie) =>
  //     movie.genres_arr.includes(type)
  //   );
  //   genres[type] = filteredMovies;
  // }
  info.forEach(movie => {
    const firstGenre = movie.genres_arr.slice(2, movie.genres_arr.length-2).split(`', `);
    const nextGenre = firstGenre[firstGenre.length-1]
    genres[firstGenre[0]].push(movie)
    if(firstGenre.length > 1 && nextGenre !== `'sport`){
      genres[nextGenre.slice(1, nextGenre.length)].push(movie)
    }
  })

  return {
    all: info,
    sort: genres,
  };
};
// Thunks

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}/api/movies`);
      let movies = await editMovies(data);
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
