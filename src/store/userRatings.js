import axios from "axios";
const url = "https://bobo-server.herokuapp.com";

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
      const { data } = await axios.get(
        `https://bobo-server.herokuapp.com/api/userRating/${userId}`
      );
      dispatch(setRatings(data));
    } catch (error) {
      console.log(error);
    }
  };
};
// dispatch(
//   addUserRating(
//     store.auth.id,
//     route.params.movie.id,
//     defaultRating,
//     thumbsRating
//   )
// );
export const addUserRating = (userId, movieId, rating, watchAgain) => {
  return async (dispatch) => {
    try {
      const { data: updatedUserRatings } = await axios.post(
        `https://bobo-server.herokuapp.com/api/userRating/${userId}/${movieId}`,
        { rating, watchAgain }
      );
      dispatch(addRating(updatedUserRatings));
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
