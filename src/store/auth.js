import axios from 'axios';
// import history from '../history';

const TOKEN = 'token';

// action types
const SET_AUTH = 'SET_AUTH';

//action creators
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//thunks
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios({
      method: 'get',
      url: `http://localhost:8080/auth/me`,
      headers:{
        authorization: token
      }
    });
    const watched = await axios({
      method: 'get',
      url: `http://localhost:8080/api/users/${res.data.id}`
    })
    watched.data.movies = watched.data.movies.map(movie => movie.id)
    return dispatch(setAuth(watched.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/auth/${method}`,
        data: {
          username,
          password
        }, 
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me())
      return true;
    } catch (authError) {
      return false;
    }
  };

// export const logout = () => {
//   window.localStorage.removeItem(TOKEN);
//   history.push('/login');
//   return {
//     type: SET_AUTH,
//     auth: {},
//   };
// };

// reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
