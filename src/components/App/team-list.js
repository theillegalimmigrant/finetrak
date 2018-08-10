import React from 'react';
import _ from 'lodash';

export default (props) => {
  return (
    <div>
      {
        _.map(props.teamDocs, (teamDoc) => (
          <div key={teamDoc.id}>
            <h2>{teamDoc.data().name}</h2>
            <ul>
              {
                _.map(teamDoc.data().players, (player, index) =>
                  <li key={`${teamDoc.data().name}-player${index}`}>{player.name}</li>
              )
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
}