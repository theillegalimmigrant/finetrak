import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-dropdown';

import * as actions from 'actions/finetrakActions';

import 'react-dropdown/style.css';

class PlayerRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectedFine: '' };

    this.onSelect = this.onSelect.bind(this);
    this.onAddFineClick = this.onAddFineClick.bind(this);
  }

  sumOfFines = (teamFineDocs, playerFines, playerPayments) => {
    const fineAmount = playerFines.reduce((total, fineId) =>
      total + teamFineDocs.filter(doc => doc.id == fineId)[0].data().amount, 0);
    const paymentAmount = playerPayments.reduce((total, payment) => total + payment.amount, 0);

    return fineAmount - paymentAmount;
  }

  onSelect(selection) {
    this.state.selectedFine = selection.value;
  }

  onAddFineClick(teamId, playerId, fineId) {

 console.log(this.state.selectedFine);
    if (this.state.selectedFine === '') return;

    actions.finePlayer(teamId, playerId, fineId);
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
      <div className='row'>
        <div className='col-sm-4'>
          {name}
        </div>
        <div className='col-sm-2'>
          {this.sumOfFines(teamFineDocs, finesIssued, payments)}
        </div>
        <div className='col-sm-6'>
          <div>
            <Dropdown
              options={fineOptions}
              placeholder='Select fine'
              onChange={this.onSelect}
            />
            <Button onClick={() => this.onAddFineClick(teamId, playerId, this.state.selectedFine)}>Add fine</Button>
          </div>
          <span>
            <input ref="payment-amount" placeholder="Enter payment amount"/>
            <Button>Add payment</Button>
          </span>
        </div>
      </div>
    );
  }
}

export default PlayerRow;