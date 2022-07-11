import React from 'react';
import { numberFormat } from '../../../../helpers';
import moment from 'moment';
import Link from 'next/link';
import { InvoiceRecord } from '../../../../../types/invoice';
import { motion } from 'framer-motion';
import { anim } from '../../../../framer';

interface props {
  data: InvoiceRecord;
}

const Record = ({ data }: props) => {
  return (
    <Link passHref={true} href={`/dashboard/invoices/invoice?q=${data.id}`}>
      <motion.div
        initial={anim.initial}
        animate={anim.animate}
        className="record"
      >
        <p>${numberFormat(Number(data.amount), 2)}</p>
        <p className="pink">{data.id}</p>
        <p>{moment(data.date).format('LL')}</p>
        <p className={`${data.status === 'paid' ? 'paid' : 'unpaid'}`}>
          {data.status}
        </p>
      </motion.div>
    </Link>
  );
};

export default Record;
