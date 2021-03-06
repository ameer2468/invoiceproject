import React, { useState } from 'react';
import Record from './record';
import { Scrollbars } from 'react-custom-scrollbars-2';
import SearchBox from '../../../global/SearchBox';
import { motion } from 'framer-motion';
import { anim } from '../../../../framer';
import { IInvoice } from '../../../../../types/invoice';
import { numberFormat } from '../../../../helpers';

interface props {
  data: IInvoice[] | undefined;
}

const InvoicesPaid = ({ data }: props) => {
  const [searchValue, setSearchValue] = useState('');
  const dataWithFilter = !data
    ? []
    : searchValue.length > 0
    ? data.filter((value) => {
        return (
          value.id.includes(searchValue) || value.amount.includes(searchValue)
        );
      })
    : data;
  const total = data?.reduce((acc, value) => {
    return acc + Number(value.amount);
  }, 0);

  return (
    <>
      {!data ? (
        ''
      ) : (
        <motion.div
          initial={anim.initial}
          animate={anim.animate}
          transition={anim.transition}
          className="InvoicesPaid"
        >
          <div className="invoicesContainer">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <SearchBox
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                placeholder="Seach invoice id or amount..."
              />
              <h2>Total: ${numberFormat(total as number, 2)}</h2>
            </div>
            <div className="col-headings">
              <h3>Amount</h3>
              <h3>Invoice #</h3>
              <h3>Date</h3>
              <h3>Status</h3>
            </div>
            {dataWithFilter.length === 0 && (
              <p className="absoluteCenter">No Invoices</p>
            )}
            <Scrollbars style={{ width: '100%', height: '43rem' }}>
              {dataWithFilter.map((value, index) => {
                return <Record key={index.toString()} data={value} />;
              })}
            </Scrollbars>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default InvoicesPaid;
