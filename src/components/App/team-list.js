import React from 'react';
import _ from 'lodash';

export default (props) => {
    return (
        <ul>
            {
                _.map(props.teams, (team) => <li>{team.name}</li>)
            }
        </ul>
    )
}