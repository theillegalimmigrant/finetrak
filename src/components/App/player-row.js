import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import './style.css';

class PlayerRow extends React.Component {

  sumOfFines = (teamFineDocs, playerFines, playerPayments) => {
//    const fineAmount = playerFines.reduce((total, fine) => total + teamFineDocs.doc(fine.fineId).amount, 0);
//    const paymentAmount = playerPayments.reduce((total, payment) => total + payment.amount, 0);
//
//    return fineAmount - paymentAmount;
    return 10;
  }

  render() {
    const {
      teamFineDocs,
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
          {this.sumOfFines(teamFineDocs, fines, payments)}
        </div>
        <div className='col-sm-6'>
          <span>
            <Dropdown>
              <DropdownTrigger>Add fine</DropdownTrigger>
              <DropdownContent>
                <ul>
                  <li>Drop catch</li>
                  <li>Duck</li>
                </ul>
              </DropdownContent>
            </Dropdown>
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