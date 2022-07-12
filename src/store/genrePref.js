import axios from 'axios';

// Action constants
const SET_USER_GENRE = 'SET_USER_GENRE';
const GET_USER_GENRE = 'GET_USER_GENRE';
const GET_MOVIE_GENRE = 'GET_MOVIE_GENRE';

// Action creators
const setUserGenre = (genres) => {
  return {
    type: SET_USER_GENRE,
    genres,
  };
};
const getUserGenre = (genres) => {
  return {
    type: GET_USER_GENRE,
    genres,
  };
};
const getMovieGenre = (genres) => {
  return {
    type: GET_MOVIE_GENRE,
    genres,
  };
};

// Thunks
export const fetchUserGenre = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/genre/${userId}`);
      dispatch(getUserGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserGenre = (userId, genre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/genre/${userId}`, genre);
      dispatch(setUserGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMovieGenre = (movieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/movies/genre/${movieId}`);
      dispatch(getMovieGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_GENRE:
      return action.genres;
    case GET_USER_GENRE:
      return action.genres;
    case GET_MOVIE_GENRE:
      return action.genres;
    default:
      return state;
  }
};
