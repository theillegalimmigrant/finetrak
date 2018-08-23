import React from 'react';
import _ from 'lodash';
import PlayerRow from './player-row';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';

// for offline development
import dummyData from 'data/dummy';

import * as actions from 'actions/finetrakActions';

const mapDispatchToProps = dispatch => ({
  dispatchCreatePlayer: (teamId, name) => dispatch(actions.createPlayer(teamId, name))
})

class TeamList extends React.Component {

  onCreatePlayer = (teamDoc) => {
    let playerName = this.refs['new-player-name'].value;
    if (playerName = '') {
      this.props.dispatchCreatePlayer(teamDoc.id, playerName);
      this.refs['new-player-name'].value = '';
    }
  }

  render() {

    const {
      teamDoc,
      playerDocs,
      fineDocs,
      isAdmin
    } = this.props;

    const team = teamDoc ? teamDoc.data() : {};

    const isOffline = false;
    const offlineTeamDoc = isOffline ? dummyData : teamDoc;

    return (
            <div className='container' key={teamDoc.id}>
              <h2>{team.name}</h2>
              <div>
                { isAdmin &&
                  <span>
                    <input ref="new-player-name" placeholder="Enter new player"/>
                    <Button onClick={() => this.onCreatePlayer(teamDoc)}>Add player</Button>
                  </span>
                }
                <span>
                  {
                    _.map(playerDocs, (playerDoc) => {
                      let player = playerDoc.data();
                      return (
                        <PlayerRow
                          key={playerDoc.id}
                          teamFineDocs={fineDocs}
                          teamId={teamDoc.id}
                          playerId={playerDoc.id}
                          player={player}
                        />
                      )
                    })
                  }
                </span>
              </div>
            </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(TeamList);