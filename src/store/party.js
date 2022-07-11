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
      const { data } = await axios.get(`/api/parties/party/${partyId}`);
      dispatch(setParty(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addParty = (userId, username, name, location, date) => {
  return async (dispatch) => {
    try {
      const newParty = await axios.post(`/api/parties/`, {
        name,
        location,
        date,
        host: username,
      });
      const { data } = await axios.put(
        `/api/parties/${newParty.data.id}/${userId}`
      );
      dispatch(_addParty(data));
    } catch (error) {
      console.log(error);
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
