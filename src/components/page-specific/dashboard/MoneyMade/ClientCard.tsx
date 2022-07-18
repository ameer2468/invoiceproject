import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { IInvoice } from '../../../../../types/invoice';

interface props {
  data: IInvoice;
}

const ClientCard = ({ data }: props) => {
  return (
    <div className="clientCard">
      <h2>{data.to}</h2>
      <div className="details">
        <p>
          <FontAwesomeIcon icon={faSackDollar} /> ${data.amount}
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
