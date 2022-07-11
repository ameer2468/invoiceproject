import React from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getInvoice } from '../../../../src/services/invoices/services';
import Page from '../../../../src/components/global/Page';
import Input from '../../../../src/components/global/Input';

const EditInvoice = () => {
  const pageId = useRouter().query.id;
  const { data, status } = useQuery(
    ['invoice', pageId],
    async () => {
      return await getInvoice(pageId as string);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const invoiceInfo = data && { ...data.id[0] };

  return (
    <Page pageName={'editInvoice'}>
      <h1>Edit Invoice</h1>
      <div className="editInvoiceContent">
        <h2>Info</h2>
        {/*<Input placeholder={'e'} value={} name={} onChange={}/>*/}
      </div>
    </Page>
  );
};

export default EditInvoice;
EditInvoice.Layout = DashboardLayout;
