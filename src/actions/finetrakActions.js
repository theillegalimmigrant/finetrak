import * as fb from 'javascript/firebase';
import actionType from 'constants';

export const getTeam = (name, code) => {
  return dispatch => {
    dispatch({
      type: actionType.GET_TEAM_REQUEST
    });
    dispatch({
      type: actionType.GET_TEAM_PLAYERS_REQUEST
    });
    dispatch({
      type: actionType.GET_TEAM_FINES_REQUEST
    })
    fb.getTeam(name, code)
      .then(team => {

        dispatch({
          type: actionType.GET_TEAM_SUCCESS,
          payload: team.docs
        });


        let teamId = team.docs[0].id;
        fb.getTeamFines(teamId)
          .then(fines => {
            dispatch({
              type: actionType.GET_TEAM_FINES_SUCCESS,
              payload: fines.docs
            })
          })
          .catch(error => {
            dispatch({
             type: actionType.GET_TEAM_FINES_FAILED,
             payload: error
            })
          });
        fb.getTeamPlayers(teamId)
          .then(players => {
            dispatch({
              type: actionType.GET_TEAM_PLAYERS_SUCCESS,
              payload: players.docs
            })
          })
          .catch(error => {
            dispatch({
             type: actionType.GET_TEAM_PLAYERS_FAILED,
             payload: error
            })
          });
      })
      .catch(error => {
        dispatch({
          type: actionType.GET_TEAM_FAILED,
          payload: error
        });
      });
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

export const refreshTeam = (teamId) => {
  return dispatch => {
      dispatch({
        type: actionType.GET_TEAM_REQUEST
      })
      fb.getTeamPlayers(teamId)
        .then(players => {
          dispatch({
            type: actionType.GET_TEAM_PLAYERS_SUCCESS,
            payload: players.docs
          })
        })
        .catch(error => {
          dispatch({
           type: actionType.GET_TEAM_PLAYERS_FAILED,
           payload: error
          })
        });
    };
}

export const createPlayer = (teamId, name) => {
  return dispatch => {
    dispatch({
      type: actionType.ADD_PLAYER_REQUEST
    });
    fb.addPlayer(teamId, name)
      .then(res => {
          refreshTeam(teamId)(dispatch)
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
  };
}

export const finePlayer = (teamId, playerId, fineId) => {
    return dispatch => {
        dispatch({
            type: actionType.FINE_PLAYER_REQUEST
        })
        fb.finePlayer(teamId, playerId, fineId)
          .then(res => {
            refreshTeam(teamId)(dispatch)
            dispatch({
              type: actionType.FINE_PLAYER_SUCCESS
            })
          })
          .catch(error => {
            dispatch({
              type: actionType.FINE_PLAYER_FAILURE,
              payload: error
            })
          })

    };
}