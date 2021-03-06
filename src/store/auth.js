import axios from "axios";

const url = "https://bobo-server.herokuapp.com";

const TOKEN = "token";
// action types
const SET_AUTH = "SET_AUTH";

//action creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//thunks
export const me = (data) => async (dispatch) => {
  const token = data.token;
  if (token) {
    const res = await axios.get(`${url}/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    const watched = await axios.get(`${url}/api/users/${res.data.id}
    `);
    if (watched.data.length) {
      watched.data.movies = watched.data.movies.map((movie) => movie.id);
    }

    return dispatch(setAuth(watched.data));
  }
};

export const authenticate = (userData, method) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/auth/${method}`, userData)
    dispatch(me(res.data));
    return true;
  } catch (authError) {
    return false;
  }
};



// reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
