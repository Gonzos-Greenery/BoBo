import axios from 'axios';

// Action constant
const SET_MOVIE = 'SET_MOVIE';

// Action creator

const setMovie = (movie) => {
  return {
    type: SET_MOVIE,
    movie,
  };
};

// Thunks

export const fetchMovie = (movieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/movies/${movieId}`);
      dispatch(setMovie(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE:
      return action.movie;
    default:
      return state;
  }
};
