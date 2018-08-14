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

const sumOfFines = (teamFines, playerFines, playerPayments) => {
console.log('fines');
  const fineAmount = playerFines.reduce((total, fine) => total + teamFines[fine.fineId].amount, 0);
  const paymentAmount = playerPayments.reduce((total, payment) => total + payment.amount, 0);

  return fineAmount - paymentAmount;
}

export default (props) => {

  const {
    teamName,
    teamFines
  } = props;

  const {
    name,
    fines,
    payments
  } = props.player;

  return (
    <div className='row'>
      <div className='col-sm-4'>
        {name}
      </div>
      <div className='col-sm-2'>
        {sumOfFines(teamFines, fines, payments)}
      </div>
      <div className='col-sm-6'>
        <span>
          <DropdownButton id={`${name}-addFine`} key={`${name}-addFine`} title='Add fine' >
            {
              teamFines.map((fine, index) => {
                return (<MenuItem eventKey={index} key={`${teamName}-${name}-fine-${index}`}>{fine.infringement}</MenuItem>);
              })
            }
          </DropdownButton>
        </span>
        <span>
          <input ref="payment-amount" placeholder="Enter payment amount"/>
          <Button>Add payment</Button>
        </span>
      </div>
    </div>
  );
}