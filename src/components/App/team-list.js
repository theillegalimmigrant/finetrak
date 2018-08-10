import React from 'react';
import _ from 'lodash';

export default (props) => {
    return (
        <ul>
            {
                _.map(props.teamDocs, (teamDoc) => <li key={teamDoc.id}>{teamDoc.data().name}</li>)
            }
        </ul>
    )
}