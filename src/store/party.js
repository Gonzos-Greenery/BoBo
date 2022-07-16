import axios from 'axios';

// Action constant
const ADD_PARTY = 'ADD_PARTY';
const SET_PARTY = 'SET_PARTY';

// Action creator

const _addParty = (newParty) => {
  return {
    type: ADD_PARTY,
    newParty,
  };
};

const setParty = (party) => {
  return {
    type: SET_PARTY,
    party,
  };
};

// Thunks

export const fetchParty = (partyId) => {
  return async (dispatch) => {
    try {
      // const { data } = await axios({
      //   method: 'get',
      //   url: `http://localhost:8080/api/party/${partyId}`,
      // });
      const {data} = await axios.get(`https://bobo-server.herokuapp.com/api/party/${partyId}`)
      dispatch(setParty(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewParty = (userId, name, location, date, invitees) => {
  return async (dispatch) => {
    try {
      const { data: newParty } = await axios({
        method: 'post',
        url: `http://localhost:8080/api/party`,
        data: {
          name,
          location,
          date,
        },
      });
      await axios({
        method: 'put',
        url: `http://localhost:8080/api/party/addPartyHost/${newParty.id}/${userId}`,
      });
      for (let i = 0; i < invitees.length; i++) {
        console.log(invitees[i].username);
        await axios({
          method: 'put',
          url: `http://localhost:8080/api/party/addUsers/${newParty.id}/${invitees[i].username}`,
        });
      }
      dispatch(_addParty(newParty));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFriendToParty = (username, partyId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: 'put',
        url: `http://localhost:8080/api/party/${partyId}/${username}`,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARTY:
      return action.newParty;
    case SET_PARTY:
      return action.party;
    default:
      return state;
  }
};
