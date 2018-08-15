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
      return newState;
    }
    default:
        return state;
  }
};