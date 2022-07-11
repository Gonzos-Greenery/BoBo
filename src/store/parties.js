import axios from 'axios';

// Action constants
const SET_PARTIES = 'SET_PARTIES';
const DELETE_PARTY = 'DELETE_PARTY';

// Action creators
const setParties = (parties) => {
  return {
    type: SET_PARTIES,
    parties,
  };
};

const _deleteParty = (party) => {
  return {
    type: DELETE_PARTY,
    party,
  };
};

// Thunks
export const fetchParties = (userId) => {
  return async (dispatch) => {
    try {
      const { data: allParties } = await axios.get(`/api/parties/${userId}`);
      const partiesWithUser = allParties.map((party) => {
        let userIds = party.users.map((user) => user.id);
        if (userIds.includes(userId)) {
          return party;
        }
      });
      dispatch(setParties(partiesWithUser));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteParty = (id) => {
  return async (dispatch) => {
    try {
      const { data: party } = await axios.delete(`/api/parties/${id}`);
      dispatch(_deleteParty(party));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARTIES:
      return action.parties;
    case DELETE_PARTY:
      return state.filter((party) => party.id !== action.party.id);
    default:
      return state;
  }
};
