import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { Invoice } from '../../../../../types/invoice';

interface props {
  data: Invoice;
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
