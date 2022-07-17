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
      const { data } = await axios.get(`https://bobo-server.herokuapp.com/api/users/genre/${userId}`);
      dispatch(getUserGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserGenre = (userId, genres) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios.post(`/api/users/genre/${userId}`, genre);
      // const { data } = await axios({
        //   method: 'post',
        //   url: `http://localhost:8080/api/users/genres/add/${userId}`,
        //   data: {
          //     genres,
          //   },
          // });
      const {data} = await axios(`https://bobo-server.herokuapp.com/api/users/genres/add/${userId}`, {genres})
      dispatch(setUserGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMovieGenre = (movieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://bobo-server.herokuapp.com/api/movies/genre/${movieId}`);
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
