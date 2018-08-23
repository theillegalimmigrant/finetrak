import _ from 'lodash';
import actionType from 'constants';

const initialState = {
    teamDocs: {}
};

export default (state = initialState, action) => {
  let newState = _.merge({}, state);
  switch(action.type) {
    case actionType.ADMIN_GET_TEAM_SUCCESS: {
      newState.teamDoc = action.payload[0];
      newState.isAdmin=true;
      return newState;
    }
    case actionType.GET_TEAM_SUCCESS: {
      newState.teamDoc = action.payload[0];
      newState.isAdmin=false;
      return newState;
    }
    case actionType.GET_TEAM_FINES_SUCCESS: {
      newState.fineDocs = action.payload;
      return newState;
    }
    case actionType.GET_TEAM_PLAYERS_SUCCESS: {
      newState.playerDocs = action.payload;
      return newState;
    }
    case actionType.GET_TEAM_FAILED:
    case actionType.GET_TEAM_FINES_FAILED:
    case actionType.GET_TEAM_PLAYERS_FAILED:
    case actionType.ADD_GET_TEAM_FAILED: {
      return state;
    }
    default:
        return state;
  }
};