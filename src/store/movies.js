import axios from "axios";
const url = "https://reqres.in";

// Action constants
const SET_MOVIES = "SET_MOVIES";

// Action creators
const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies,
  };
};

// Thunks

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${url}/api/movies`,
      });
      // const { data } = await axios.get(`http://localhost:8080/api/movies`);
      dispatch(setMovies(data));
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
