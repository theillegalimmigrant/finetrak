import _ from 'lodash';
import actionType from 'constants';

const initialState = {
    teamDocs: {}
};

export default (state = initialState, action) => {
  let newState = _.merge({}, state);
  switch(action.type) {
    case actionType.GET_TEAM_SUCCESS: {
      newState.teamDoc = action.payload[0];
      newState.isError = false;
      return newState;
    }
    case actionType.GET_TEAM_FINES_SUCCESS: {
      newState.fineDocs = action.payload;
      newState.isError = false;
      return newState;
    }
    case actionType.GET_TEAM_PLAYERS_SUCCESS: {
      newState.playerDocs = action.payload;
      newState.isError = false;
      return newState;
    }
    case actionType.GET_TEAM_FAILED:
    case actionType.GET_TEAM_FINES_FAILED:
    case actionType.GET_TEAM_PLAYERS_FAILED: {
      newState.isError = true;
      return newState;
    }
    default:
        return state;
  }
};