import React from 'react';
import _ from 'lodash';
import {
  Button,
  MenuItem,
  DropdownButton
} from 'react-bootstrap';
//
//import DropdownButton from './DropdownButton';
//
//import SimpleDropdown from './SimpleDropdown';

class PlayerRow extends React.Component {

  sumOfFines = (teamFines, playerFines, playerPayments) => {
    console.log('fines');
    const fineAmount = playerFines.reduce((total, fine) => total + teamFines[fine.fineId].amount, 0);
    const paymentAmount = playerPayments.reduce((total, payment) => total + payment.amount, 0);

    return fineAmount - paymentAmount;
  }

  render() {
    const {
      teamName,
      teamFines,
      player
    } = this.props;

    const {
      name,
      fines,
      payments
    } = player;

    return (
      <div className='row'>
        <div className='col-sm-4'>
          {name}
        </div>
        <div className='col-sm-2'>
          {this.sumOfFines(teamFines, fines, payments)}
        </div>
        <div className='col-sm-6'>
          <span>

          </span>
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