import React from 'react';
import _ from 'lodash';

const sumOfFines = (teamFines, playerFines) => {
  return playerFines.reduce((total, fine) => total + teamFines[fine.fineId].amount, 0)
}

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
                  <li key={`${teamDoc.data().name}-player${index}`}>{`${player.name} = ${sumOfFines(teamDoc.data().fines, player.fines)}`}</li>
                )
              }
            </ul>
          </div>
        ))
      }
    </div>
  );
}