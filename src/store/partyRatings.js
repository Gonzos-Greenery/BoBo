import axios from "axios";
const url = "https://bobo-server.herokuapp.com";

// Action constants
const ADD_PARTY_RATING = "ADD_PARTY_RATING";
const SET_PARTY_RATINGS = "SET_PARTY_RATINGS";

// Action creators
const setRatings = (ratings) => {
  return {
    type: SET_PARTY_RATINGS,
    ratings,
  };
};
const addRating = (ratings) => {
  return {
    type: ADD_PARTY_RATING,
    ratings,
  };
};

// Thunks

export const fetchPartyRatings = (partyId) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios.get(
      //   `http://localhost:8080/api/partyrating/${partyId}`
      // );
      const { data } = await axios({
        method: "get",
        url: `${url}/api/partyrating/${partyId}`,
      });
      dispatch(setRatings(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPartyRating = (partyId, userId, movieId, rating) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${url}/api/partyrating/add/${movieId}/${partyId}/${userId}`,
        data: {
          rating,
        },
      });
      dispatch(addRating(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARTY_RATING:
      return action.ratings;
    case SET_PARTY_RATINGS:
      return action.ratings;
    default:
      return state;
  }
};
