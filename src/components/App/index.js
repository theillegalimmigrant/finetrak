import React, { Component } from 'react';
import TeamList from './team-list';
import {connect} from 'react-redux';
import * as actions from 'actions/finetrakActions';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';

import './style.css';

const mapStateToProps = (state) => ({
  teamDoc: state.finetrakReducer.teamDoc,
  playerDocs: state.finetrakReducer.playerDocs,
  fineDocs: state.finetrakReducer.fineDocs,
  isAdmin: state.finetrakReducer.isAdmin,
})

const mapDispatchToProps = dispatch => ({
  dispatchCreateTeam: (name,code) => dispatch(actions.createTeam(name, code)),
  dispatchGetTeamAdmin: (name,code) => dispatch(actions.getTeamAdmin(name, code)),
  dispatchGetTeam: (name) => dispatch(actions.getTeam(name)),
})

class App extends Component {


    onSubmit = (e) => {
        e.preventDefault();
        let ref = this.refs['team-name'];
        let code = this.refs['team-code'];
        if (ref.value !== '' && code.value !== '') {
          this.props.dispatchCreateTeam(ref.value,code.value);
          ref.value = '';
          code.value = '';
        }
    }

    onJoin = (e) => {
      e.preventDefault();
      let ref = this.refs['team-name'];
      let code = this.refs['team-code'];
      if (ref.value !== '') {
        if (code.value !== '') {
          this.props.dispatchGetTeamAdmin(ref.value, code.value);
        } else {
          this.props.dispatchGetTeam(ref.value);
        }
        ref.value = '';
        code.value = '';
      } else {
        this.props.dispatchGetTeamAdmin('DLSKCC1','dlskcc1');
      }
    }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref="team-name" placeholder="Enter team name"/>
          <input ref="team-code" placeholder="Enter team code"/>
          <Button onClick={this.onSubmit}>Add new team</Button>
          <Button onClick={this.onJoin}>Open existing team</Button>
        </form>
        { this.props.teamDoc ?
          <TeamList teamDoc={this.props.teamDoc} playerDocs={this.props.playerDocs} fineDocs={this.props.fineDocs} isAdmin={this.props.isAdmin} /> :
          <div>Enter your team name to view fines and enter code to view admin page</div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
