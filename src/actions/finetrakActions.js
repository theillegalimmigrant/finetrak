import * as fb from 'javascript/firebase';
import actionType from 'constants';

export const loadTeams = () => {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_TEAMS_REQUEST
        });
        fb.getTeamsDB()
            .then(teams => {
                dispatch({
                    type: actionType.LOAD_TEAMS_SUCCESS,
                    payload: teams.docs
                });
            })
            .catch(error => {
                dispatch({
                    type: actionType.LOAD_TEAMS_FAILED,
                    payload: error
                });
            })
    };
}

export const getTeam = (name, code) => {
  return dispatch => {
    dispatch({
      type: actionType.GET_TEAM_REQUEST
    })
    fb.getTeam(name, code)
      .then(team => {
        dispatch({
          type: actionType.GET_TEAM_SUCCESS,
          payload: team.docs
        })
      })
      .catch(error => {
        dispatch({
          type: actionType.GET_TEAM_FAILED,
          payload: error
        });
      })
  };
}

export const createTeam = (name, code) => {
    return dispatch => {
        dispatch({
            type: actionType.ADD_TEAM_REQUEST
        })
        fb.addTeam(name, code)
            .then(res => {
                getTeam(name, code)(dispatch)
                dispatch({
                    type: actionType.ADD_TEAM_SUCCESS
                })
            })
            .catch(error => {
                dispatch({
                    type: actionType.ADD_TEAM_FAILURE,
                    payload: error
                })
            })
    };
}

export const getTeamById = (teamId) => {
  return dispatch => {
      dispatch({
        type: actionType.GET_TEAM_REQUEST
      })
      fb.getTeamById(teamId)
        .then(team => {
          dispatch({
            type: actionType.GET_TEAM_SUCCESS,
            payload: team.docs
          })
        })
        .catch(error => {
          dispatch({
            type: actionType.GET_TEAM_FAILED,
            payload: error
          });
        })
    };
}

export const createPlayer = (teamId, name) => {

    console.log(teamId);
    console.log(name);
    fb.addPlayer(teamId, name);
  return dispatch => {
    dispatch({
      type: actionType.ADD_PLAYER_REQUEST
    })
    fb.addPlayer(teamId, name)
      .then(res => {
          getTeamById(teamId)(dispatch)
          dispatch({
              type: actionType.ADD_PLAYER_SUCCESS
          })
      })
      .catch(error => {
        dispatch({
          type: actionType.ADD_PLAYER_FAILURE,
          payload: error
        })
      })
  }
}
