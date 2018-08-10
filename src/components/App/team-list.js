import React from 'react';
import _ from 'lodash';

export default (props) => {
console.log(props);
    return (
        <ul>
            {
                _.map(props.teamDocs, (teamDoc) => <li>{teamDoc.data().name}</li>)
            }
        </ul>
    )
}