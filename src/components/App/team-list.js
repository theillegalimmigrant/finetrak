import React from 'react';
import _ from 'lodash';
import PlayerRow from './player-row';
import { Button } from 'react-bootstrap';

// for offline development
import dummyData from 'data/dummy';

import * as actions from 'actions/finetrakActions';


class TeamList extends React.Component {

  onCreatePlayer = (teamDoc) => {
    let playerName = this.refs['new-player-name'].value;
    actions.createPlayer(teamDoc.id, playerName);
    this.refs['new-player-name'].value = '';
  }

  render() {

    const {
      teamDoc,
      playerDocs,
      fineDocs,
    } = this.props;

    const team = teamDoc ? teamDoc.data() : {};

    const isOffline = false;
    const offlineTeamDoc = isOffline ? dummyData : teamDoc;

    return (
      <div>
        {
          !teamDoc ?
          <div>
            Incorrect team name or team code. Please try again.
          </div>
//          (
//            <div className='container' key={offlineTeamDoc.id}>
//              <h2>{offlineTeamDoc.name}</h2>
//              <div>
//                <span>
//                  <input ref="new-player-name" placeholder="Enter new player"/>
//                  <Button onClick={() => this.onCreatePlayer(offlineTeamDoc)}>Add player</Button>
//                </span>
//              </div>
//            </div>
//          )
          :
          (
            <div className='container' key={teamDoc.id}>
              <h2>{team.name}</h2>
              <div>
                <span>
                  <input ref="new-player-name" placeholder="Enter new player"/>
                  <Button onClick={() => this.onCreatePlayer(teamDoc)}>Add player</Button>
                </span>
                <span>
                  {
                    _.map(playerDocs, (playerDoc) => {
                      let player = playerDoc.data();
                      return (
                        <PlayerRow
                          key={playerDoc.id}
                          teamFineDocs={fineDocs}
                          player={player}
                        />
                      )
                    })
                  }
                </span>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default TeamList;