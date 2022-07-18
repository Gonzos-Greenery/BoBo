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
      // await axios.post(
      //   `https://bobo-server.herokuapp.com/api/partyrating/add/${movieId}/${partyId}/${userId}`,
      //   { rating }
      // );
      // const { data: updatedPartyRatings } = await axios.get(
      //   `https://bobo-server.herokuapp.com/api/partyrating/${partyId}`
      // );
      // dispatch(addRating(updatedPartyRatings));
      const { data: updatedUserRatings } = await axios.post(
        `https://bobo-server.herokuapp.com/api/userRating/${userId}/${movieId}`,
        { rating, watchAgain }
      );
      // const { data: newParty } = await axios({
      //   method: "post",
      //   url: `http://localhost:8080/api/userRating/${userId}/${movieId}`,
      //   data: {
      //     rating,
      //   },
      // });
      // await axios.post(
      //   `${localhost}/api/userRatings/add/${userId}/${movieId}`,
      //   rating
      // );
      // const { data: updatedUserRatings } = await axios.get(
      //   `${localhost}/api/userRatings/${userId}`
      // );
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
