import { getTeamsDB, addTeam } from 'javascript/firebase';
import actionType from 'constants';

export const loadTeams = () => {
    return dispatch => {
        dispatch({
            type: actionType.LOAD_TEAMS_REQUEST
        });
        getTeamsDB()
            .then(teams => {
                console.log(teams.docs);
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

export const createTeam = (name, code) => {
    return dispatch => {
        dispatch({
            type: actionType.ADD_TEAM_REQUEST
        })
        addTeam(name, code)
            .then(res => {
                loadTeams()(dispatch) //refresh the data to keep up to date
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