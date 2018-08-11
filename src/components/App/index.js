import React, { Component } from 'react';
import TeamList from './team-list';
import {connect} from 'react-redux';
import * as actions from 'actions/finetrakActions';
import './style.css';

const mapStateToProps = (state) => ({
  teamDocs: state.finetrakReducer.teamDocs
})

const mapDispatchToProps = dispatch => ({
  dispatchLoadTeams: () => dispatch(actions.loadTeams()),
  dispatchCreateTeam: (name,code) => dispatch(actions.createTeam(name, code)),
  dispatchGetTeam: (name,code) => dispatch(actions.getTeam(name, code))
})

class App extends Component {
    componentDidMount() {
        this.props.dispatchLoadTeams();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let ref = this.refs['team-name'];
        let code = this.refs['team-code'];
        let teamName = ref.value;
        this.props.dispatchCreateTeam(teamName,code.value);
        ref.value = '';
        code.value = '';
    }

    onJoin = (e) => {
      e.preventDefault();
      let ref = this.refs['team-name'];
      let code = this.refs['team-code'];
      let teamName = ref.value;
      this.props.dispatchGetTeam(teamName,code.value);
      ref.value = '';
      code.value = '';
    }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref="team-name"/>
          <input ref="team-code"/>
          <button onClick={this.onSubmit}>Add new team</button>
          <button onClick={this.onJoin}>Join team</button>
        </form>

        <TeamList teamDocs={this.props.teamDocs}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
