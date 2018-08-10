import React, { Component } from 'react';
import TeamList from './team-list';
import {connect} from 'react-redux';
import {loadTeams, createTeam} from 'actions/finetrakActions';
import './style.css';

const mapStateToProps = (state) => ({
    teams: state.teams
})

class App extends Component {
    componentDidMount() {
        this.props.loadTeams();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let ref = this.refs['team-name'];
        let code = this.refs['team-code'];
        let teamName = ref.value;
        this.props.createTeam(teamName,code.value);
        ref.value = '';
        code.value = '';
    }
    render() {
        return (
            <div>
                <TeamList teams={this.props.teams}/>
                <form onSubmit={this.onSubmit}>
                    <input ref="team-name"/>
                    <input ref="team-code"/>
                    <button>Add new team</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, {loadTeams, createTeam})(App)
