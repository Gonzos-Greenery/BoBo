import axios from 'axios';

const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';

// Action creator
const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

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

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios.put(`/api/users/${user.id}`, user);
      const { data: updatedUser } = await axios({
        method: 'put',
        url: `http://localhost:8080/api/users/${user.id}`,
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

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};
