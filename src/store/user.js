import axios from 'axios';

const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME';
const ADD_FRIEND = 'ADD_FRIEND';

// Action creator
const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const getUserByUsername = (user) => {
  return {
    type: GET_USER_BY_USERNAME,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const addUserFriend = (user) => {
  return {
    type: ADD_FRIEND,
    user,
  };
};

//Thunks
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(`/api/users/${userId}`);
      dispatch(getUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserByUsername = (username) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(
        `http://localhost:8080/api/users/username/${username}`
      );
      dispatch(getUserByUsername(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await axios({
        method: 'put',
        url: `http://localhost:8080/api/users/update/${user.id}`,
        data: {
          user,
        },
      });
      dispatch(_updateUser(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUpdateWatched = (id, movies) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `http://localhost:8080/api/users/movieswatched/register/add/${id}`,
        data: {
          movies: movies,
        },
      });
      dispatch(getUser(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addFriend = (userId, friendUsername) => {
  return async (dispatch) => {
    try {
      const { data: friend } = await axios.get(
        `http://localhost:8080/api/users/username/${friendUsername}`
      );
      const { data } = await axios({
        method: 'put',
        url: `http://localhost:8080/api/users/addFriend/${userId}/${friend.id}`,
      });
      dispatch(addFriend(data));
    } catch (e) {
      console.log(e);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case GET_USER_BY_USERNAME:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case ADD_FRIEND:
      return action.user;
    default:
      return state;
  }
};
