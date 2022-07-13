import axios from 'axios';

const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const REGISTER_USER='REGISTER_USER'

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

const register = (user) => {
  return {
    type: REGISTER_USER,
    user,
  };
};

export const registerUser=(user)=>{
  return async(dispatch){
    try {
      const {data:user}=await axios({method:'post',
      url:`${localhost}/api/users`)
    } catch (error) {

    }
  }
}

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
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(_updateUser(data));
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
