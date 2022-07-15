import React from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Invoice from '../../../src/components/page-specific/dashboard/Invoices/invoice';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerParent } from '../../../src/framer';
import { Invoice as InvoiceType } from '../../../types/invoice';
import Page from '../../../src/components/global/Page';
import { useFetchInvoices } from '../../../src/hooks/useInvoice';
import NoContent from '../../../src/components/global/NoContent';
import noinvoices from '../../../src/images/noinvoices.svg';
import InvoiceSkeleton from '../../../src/components/skeletons/invoice';

const Index = () => {
  useFetchInvoices();
  const { isLoading, isFetching, invoicesData } = useFetchInvoices();
  const skeletonArr = () => {
    let arr: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<InvoiceSkeleton key={i} />);
    }
    return arr;
  };

  return (
    <Page pageName={'invoices'}>
      <div className="main-header">
        <h1>Invoices</h1>
        {invoicesData.length === 0 ? (
          ''
        ) : (
          <Link passHref={true} href="/dashboard/invoices/new">
            <button className="button">+ New Invoice</button>
          </Link>
        )}
      </div>
      <motion.ul
        initial={'closed'}
        animate={'open'}
        variants={{ ...staggerParent.variants }}
        className="cards"
      >
        {!isLoading && !isFetching && invoicesData.length === 0 && (
          <NoContent
            title={'No invoices'}
            image={noinvoices}
            content="lets get you started and create one? it's time to get paid from your client,
              make some money, and keep yourself sustained"
            buttonText="+ Create Invoice"
            link="/dashboard/invoices/new"
          />
        )}
        {isLoading || isFetching
          ? skeletonArr()
          : invoicesData.map((item: InvoiceType, index: number) => (
              <Invoice key={index.toString()} data={item} />
            ))}
      </motion.ul>
    </Page>
  );
};

export default Index;
Index.Layout = DashboardLayout;

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}
