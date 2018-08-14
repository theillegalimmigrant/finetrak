import React from 'react';
import _ from 'lodash';
import PlayerRow from './player-row';
import {Button} from 'react-bootstrap';

import * as actions from 'actions/finetrakActions';

export default (props) => {

  const isEmptyTeam = props.teamDocs.length === 0;

  return (
    <div>
      {
        isEmptyTeam ?
        <div>
          Incorrect team name or team code. Please try again.
        </div>
        :
        _.map(props.teamDocs, (teamDoc) => (
          <div className='container' key={teamDoc.id}>
            <h2>{teamDoc.data().name}</h2>
            <div>
              <span>
                <input ref="new-player-name" placeholder="Enter new player"/>
                <Button onClick={actions.createPlayer(teamDoc, this.refs['new-player-name'].value)}>Add player</Button>
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
}