import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import {connect} from 'react-redux';

import * as actions from 'actions/finetrakActions';

import './player-row.css';
import 'react-dropdown/style.css';

const mapDispatchToProps = dispatch => ({
  dispatchFinePlayer: (teamId, playerId, fineId) => dispatch(actions.finePlayer(teamId, playerId, fineId)),
  dispatchDeletePlayer: (teamId, playerId) => dispatch(actions.deletePlayer(teamId, playerId))
})

class PlayerRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectedFine: '' };

    this.onSelect = this.onSelect.bind(this);
    this.onAddFineClick = this.onAddFineClick.bind(this);
  }

  sumOfFines = (teamFineDocs, playerFines, playerPayments) => {
    const fineAmount = playerFines.reduce((total, fineId) =>
      total + teamFineDocs.filter(doc => doc.id === fineId)[0].data().amount, 0);
    const paymentAmount = playerPayments.reduce((total, payment) => total + payment.amount, 0);

    return fineAmount - paymentAmount;
  }

  onSelect(selection) {
    this.state.selectedFine = selection.value;
  }

  onAddFineClick(teamId, playerId, fineId) {
    if (this.state.selectedFine === '') return;

    this.props.dispatchFinePlayer(teamId, playerId, fineId);
    this.state.selectedFine = '';
  }

  render() {
    const {
      teamFineDocs,
      player,
      playerId,
      teamId,
    } = this.props;

    const {
      name,
      finesIssued,
      payments
    } = player;

    const fineOptions = _.map(teamFineDocs, (fineDoc) => {
      let fine = fineDoc.data();
      return ({label: fine.infringement, value: fineDoc.id})
    });

    return (
      <div className="playerContainer">
        <div>
          {name}
        </div>
        <div>
          {this.sumOfFines(teamFineDocs, finesIssued, payments)}
        </div>
        <div>
          <div className="fineContainer">
            <Dropdown
              options={fineOptions}
              placeholder='Select fine'
              onChange={this.onSelect}
            />
            <Button onClick={() => this.onAddFineClick(teamId, playerId, this.state.selectedFine)}>Add fine</Button>
          </div>
          <div>
            <input ref="payment-amount" placeholder="Enter payment amount"/>
            <Button>Add payment</Button>
          </div>
        </div>
        <Button onClick={() => this.props.dispatchDeletePlayer(teamId, playerId)}>X</Button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(PlayerRow);