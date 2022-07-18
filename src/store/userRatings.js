import axios from "axios";
const localhost = "http://localhost:8080";

// Action constants
const ADD_USER_RATING = "ADD_USER_RATING";
const SET_USER_RATINGS = "SET_USER_RATINGS";

// Action creators
const setRatings = (ratings) => {
  return {
    type: SET_USER_RATINGS,
    ratings,
  };
};
const addRating = (ratings) => {
  return {
    type: ADD_USER_RATING,
    ratings,
  };
};

// Thunks

export const fetchUserRatings = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://bobo-server.herokuapp.com/api/userrating/${userId}`);
      dispatch(setRatings(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserRating = (userId, movieId, rating) => {
  return async (dispatch) => {
    try {
      const {data: newParty} = await axios.post(`https://bobo-server.herokuapp.com/api/userRating/${userId}/${movieId}`, {rating})
      dispatch(addRating(newParty));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_RATING:
      return action.ratings;
    case SET_USER_RATINGS:
      return action.ratings;
    default:
      return state;
  }
};
