import axios from 'axios';
// import history from '../history';

/**const { data } = await axios({
        method: 'post',
        url: `http://localhost:8080/api/party`,
        data: {
          date: '01/2/2022'
        }
      }) */

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
      headers: {
        authorization: token,
      },
    });
    const watched = await axios({
      method: 'get',
      url: `http://localhost:8080/api/users/${res.data.id}`,
    });
    watched.data.movies = watched.data.movies.map((movie) => movie.id);
    console.log(watched.data);
    return dispatch(setAuth(watched.data));
  }
};

export const authenticate = (userData, method) => async (dispatch) => {
  console.log('in thunk');
  try {
    const res = await axios({
      method: 'post',
      url: `http://localhost:8080/auth/${method}`,
      data: userData,
      //will need to update this input parameter on the Login page from david
    });
    window.localStorage.setItem(TOKEN, res.data.token);
    console.log('auth thunk data', res.data);
    dispatch(me());
    return true;
  } catch (authError) {
    console.log('authError', authError)
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
