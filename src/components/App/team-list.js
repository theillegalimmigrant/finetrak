import React from 'react';
import _ from 'lodash';
import PlayerRow from './player-row';
import { Button } from 'react-bootstrap';

import * as actions from 'actions/finetrakActions';


class TeamList extends React.Component {

  onCreatePlayer = (teamDoc) => {
    let playerName = this.refs['new-player-name'].value;
    actions.createPlayer(teamDoc.id, playerName);
  }

  render() {

    const {
      teamDocs
    } = this.props;

    const isEmptyTeam = teamDocs.length === 0;

    return (
      <div>
        {
          isEmptyTeam ?
          <div>
            Incorrect team name or team code. Please try again.
          </div>
          :
          _.map(teamDocs, (teamDoc) => (
            <div className='container' key={teamDoc.id}>
              <h2>{teamDoc.data().name}</h2>
              <div>
                <span>
                  <input ref="new-player-name" placeholder="Enter new player"/>
                  <Button onClick={() => this.onCreatePlayer(teamDoc)}>Add player</Button>
                </span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default TeamList;