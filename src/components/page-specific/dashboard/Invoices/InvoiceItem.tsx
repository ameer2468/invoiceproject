import React from 'react';
import { motion } from 'framer-motion';
import { staggerChildren } from '../../../../framer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { item } from '../../../../../types/invoice';

interface props {
  item: item;
}

const InvoiceItem = ({ item }: props) => {
  return (
    <motion.li {...staggerChildren} className="i-item">
      <h2>{item.description}</h2>
      <div className="info">
        <p>
          <FontAwesomeIcon className="icon" icon={faMoneyBill} />
          Amount: ${item.amount}
        </p>
      </div>
    </motion.li>
  );
};

export default InvoiceItem;
