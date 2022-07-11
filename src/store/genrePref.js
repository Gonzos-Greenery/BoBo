import axios from 'axios';

// Action constants
const SET_GENRE_PREF = 'SET_GENRE_PREF';
const GET_GENRE_PREF = 'GET_GENRE_PREF';

// Action creators
const setGenrePref = (genres) => {
  return {
    type: SET_GENRE_PREF,
    genres,
  };
};
const getGenrePref = (genres) => {
  return {
    type: GET_GENRE_PREF,
    genres,
  };
};

// Thunks
export const fetchGenrePref = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/genre/${userId}`);
      dispatch(getGenrePref(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addGenrePref = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/genre/${userId}`);
      dispatch(setGenrePref(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRE_PREF:
      return action.genres;
    case GET_GENRE_PREF:
      return action.genres;
    default:
      return state;
  }
};
