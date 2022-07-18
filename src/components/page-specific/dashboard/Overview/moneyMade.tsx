import React from 'react';
import ClientCard from '../MoneyMade/ClientCard';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { motion } from 'framer-motion';
import { anim } from '../../../../framer';
import { IInvoice } from '../../../../../types/invoice';

interface props {
  data: IInvoice[];
}

const MoneyMade = ({ data }: props) => {
  return (
    <motion.div
      className="MoneyMade"
      initial={anim.initial}
      animate={anim.animate}
      transition={anim.transition}
    >
      <div className="moneyMadeContainer">
        <Scrollbars
          className="moneyScroll"
          style={{ width: '100%', height: 550 }}
        >
          <div className="moneyMadeContainer">
            {data.map((item, index) => (
              <ClientCard data={item} key={index.toString()} />
            ))}
          </div>
        </Scrollbars>
      </div>
    </motion.div>
  );
};

export default MoneyMade;
