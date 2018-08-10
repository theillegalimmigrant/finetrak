import React, { Component } from 'react';
import TeamList from './team-list';
import {connect} from 'react-redux';
import {loadTeams, createTeam} from 'actions/finetrakActions';
import './style.css';

const mapStateToProps = (state) => ({
    teamDocs: state.teamDocs
})

class App extends Component {
    componentDidMount() {
    console.log('componentDidMount');
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
    console.log('render');
        return (
            <div>
                <TeamList teamDocs={this.props.teamDocs}/>
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
