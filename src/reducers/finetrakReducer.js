import _ from 'lodash';
import actionType from 'constants';

const initialState = {
    teamDocs: {}
};

export default (state = initialState, action) => {
  let newState = _.merge({}, state);
  switch(action.type) {
    case actionType.LOAD_TEAMS_SUCCESS: {
        newState.teamDocs = action.payload;
        return newState;
    }
    default:
        return state;
  }
};