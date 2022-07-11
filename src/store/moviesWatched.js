import axios from 'axios';

// Action constants
const ADD_MOVIE_WATCHED = 'ADD_MOVIE_WATCHED';
const SET_MOVIES_WATCHED = 'SET_MOVIES_WATCHED';

// Action creators
const setMovies = (moviesWatched) => {
  return {
    type: SET_MOVIES_WATCHED,
    moviesWatched,
  };
};
const addMovieWatched = (moviesWatched) => {
  return {
    type: ADD_MOVIE_WATCHED,
    moviesWatched,
  };
};

// Thunks

export const fetchMoviesWatched = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/moviesWatched/${userId}`);
      dispatch(setMovies(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addExistingGame = (userId, movieId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/moviesWatched/add/${userId}/${movieId}`);
      const { data: updatedMoviesWatched } = await axios.get(
        `/api/moviesWatched/${userId}`
      );
      dispatch(addMovieWatched(updatedMoviesWatched));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES_WATCHED:
      return action.moviesWatched;
    case ADD_MOVIE_WATCHED:
      return action.moviesWatched;
    default:
      return state;
  }
};
