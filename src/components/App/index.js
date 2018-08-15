import React, { Component } from 'react';
import TeamList from './team-list';
import {connect} from 'react-redux';
import * as actions from 'actions/finetrakActions';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';

import './style.css';

const mapStateToProps = (state) => ({
  teamDoc: state.finetrakReducer.teamDoc
})

const mapDispatchToProps = dispatch => ({
  dispatchLoadTeams: () => dispatch(actions.loadTeams()),
  dispatchCreateTeam: (name,code) => dispatch(actions.createTeam(name, code)),
  dispatchGetTeam: (name,code) => dispatch(actions.getTeam(name, code))
})

class App extends Component {
//    componentDidMount() {
//        this.props.dispatchLoadTeams();
//    }

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
      if (ref.value !== '' && code.value !== '') {
        this.props.dispatchGetTeam(ref.value,code.value);
        ref.value = '';
        code.value = '';
      } else {
        this.props.dispatchGetTeam('DLSKCC1','dlskcc1');
      }
    }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref="team-name" placeholder="Enter team name"/>
          <input ref="team-code" placeholder="Enter team code"/>
          <Button onClick={this.onSubmit}>Add new team</Button>
          <Button onClick={this.onJoin}>Join team</Button>
        </form>

        <TeamList teamDoc={this.props.teamDoc}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
