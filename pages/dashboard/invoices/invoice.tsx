import React, { useEffect } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Page from '../../../src/components/global/Page';
import { getInvoice } from '../../../src/services/invoices/services';
import { item, Invoice } from '../../../types/invoice';
import moment from 'moment';
import { numberFormat } from '../../../src/helpers';
import Loading from '../../../src/components/global/loading';
import { useInvoice, useInvoiceData } from '../../../src/hooks/useInvoice';
import Dropdown from '../../../src/components/global/dropdown';
import CurrencyInput from 'react-currency-input-field';
import { GetServerSideProps } from 'next';
import TextArea from '../../../src/components/global/Textarea';
import { motion } from 'framer-motion';
import { staggerChildren, staggerParent } from '../../../src/framer';
import InvoiceItem from '../../../src/components/page-specific/dashboard/Invoices/InvoiceItem';
import { useRouter } from 'next/router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfPage from '../../../src/components/page-specific/dashboard/Invoices/newInvoice/PdfPage';
import { useFetchBankingInfo } from '../../../src/hooks/useSettings';

interface props {
  invoiceData: Invoice;
  invoiceItems: item[];
}

const Invoice = ({ invoiceData, invoiceItems }: props) => {
  const {
    invoiceForm,
    handleCurrencyValueChange,
    setInvoiceForm,
    handleInputChange,
  } = useInvoice();
  const params = useRouter().query;
  const {
    invoice,
    invoiceMutate,
    editInvoiceMode,
    editInvoiceHandler,
    updateMultiValues,
    mutateLoading,
    deleteInvoiceRequest,
  } = useInvoiceData(
    {
      ...invoiceData,
      invoiceItems: invoiceItems,
    },
    invoiceForm,
    setInvoiceForm
  );
  const { data } = useFetchBankingInfo();

  useEffect(() => {
    if (invoice) {
      if (Number(params?.q) !== Number(invoice?.id)) {
        window.location.reload();
      } else {
        return;
      }
    }
    if (data) {
      updateMultiValues([
        { key: 'account_number', value: data.account_number },
        { key: 'sort_code', value: data.sort_code },
      ]);
    }
  }, [params?.q]);

  const checkDescriptionValue =
    invoiceForm && invoiceForm.description === invoice?.description;

  return (
    <Page pageName={'invoiceId'}>
      {invoice && !invoice?.id ? (
        <div className="absoluteCenter">
          <h1>This invoice no longer exists</h1>
        </div>
      ) : (
        <>
          <div className="action-buttons">
            <h1>{invoice?.to}</h1>
            <button
              className="purpleButton"
              onClick={() => {
                editInvoiceHandler(invoice as Invoice);
              }}
            >
              Edit
            </button>
            <button
              disabled={mutateLoading.delete}
              onClick={() => {
                deleteInvoiceRequest(invoice?.id as string);
              }}
              className={`pinkButton ${
                mutateLoading.delete && 'disabledButton'
              }`}
            >
              {mutateLoading.delete ? (
                <Loading style="PulseLoader" />
              ) : (
                'Delete'
              )}
            </button>
          </div>
          <div className="description">
            {editInvoiceMode ? (
              <>
                <TextArea
                  placeholder={invoice?.description as string}
                  value={invoiceForm.description}
                  name="description"
                  limitValue={300}
                  onChange={handleInputChange}
                />
                <button
                  disabled={mutateLoading.description || checkDescriptionValue}
                  onClick={() => {
                    invoiceMutate('description');
                  }}
                  className={`textAreaButton ${
                    mutateLoading.description || checkDescriptionValue
                      ? 'disabledButton'
                      : ''
                  }`}
                >
                  {mutateLoading.description ? (
                    <Loading style="PulseLoader" />
                  ) : (
                    'Save description'
                  )}
                </button>
              </>
            ) : (
              <p>{invoice?.description}</p>
            )}
          </div>
          <motion.ul
            variants={{ ...staggerParent.variants }}
            initial="closed"
            animate="open"
            className="stats"
          >
            <motion.li {...staggerChildren} className="stat">
              <p className="bold">Id:</p>
              <p>{invoice?.id}</p>
            </motion.li>
            <motion.li {...staggerChildren} className="stat">
              {editInvoiceMode ? (
                <div className="flex">
                  <CurrencyInput
                    name="amount"
                    onValueChange={handleCurrencyValueChange}
                    value={invoiceForm?.amount}
                    prefix="$"
                    placeholder="New amount"
                    decimalScale={2}
                    decimalsLimit={2}
                  />
                  <button
                    disabled={invoice?.amount === invoiceForm.amount}
                    className={
                      invoice?.amount === invoiceForm.amount
                        ? 'disabledButton'
                        : ''
                    }
                    onClick={() => {
                      invoiceMutate('amount');
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <>
                  <p className="bold">Amount:</p>
                  {mutateLoading.amount ? (
                    <Loading style={'PulseLoader'} />
                  ) : (
                    <p>${numberFormat(Number(invoice?.amount), 2)}</p>
                  )}
                </>
              )}
            </motion.li>
            <motion.li {...staggerChildren} className="stat">
              <p className="bold">Status:</p>
              <p className={invoice?.status === 'paid' ? 'paid' : 'unpaid'}>
                {editInvoiceMode ? '' : invoice?.status}
              </p>
              <div>
                {mutateLoading.status ? (
                  <Loading style={'PulseLoader'} />
                ) : (
                  editInvoiceMode && (
                    <Dropdown
                      defaultValue={'Status'}
                      options={
                        invoice?.status === 'paid' ? ['unpaid'] : ['paid']
                      }
                      style={{ backgroundColor: '#252525' }}
                      onSelect={() => {
                        invoiceMutate('status');
                      }}
                    />
                  )
                )}
              </div>
            </motion.li>
            <motion.li {...staggerChildren} className="stat">
              <p className="bold">Date:</p>
              <p>{moment(invoice?.date).format('MMM Do YYYY')}</p>
            </motion.li>
          </motion.ul>
          <h1>Invoice Items</h1>
          <motion.ul
            initial={'closed'}
            animate={'open'}
            variants={{ ...staggerParent.variants }}
            className="items"
          >
            {invoice?.invoiceItems.length === 0 ? (
              <div
                style={{ top: '120%', opacity: 0.5 }}
                className="absoluteCenter"
              >
                <p>No Items</p>
              </div>
            ) : (
              invoice?.invoiceItems.map((item: any, index: number) => (
                <InvoiceItem item={item} key={index.toString()} />
              ))
            )}
          </motion.ul>
          {invoice && (
            <PDFDownloadLink
              document={<PdfPage invoiceInfo={invoice} />}
              fileName={`invoice-${invoice?.id}.pdf`}
            >
              <button className="button">Download Invoice</button>
            </PDFDownloadLink>
          )}
        </>
      )}
    </Page>
  );
};

export default Invoice;
Invoice.Layout = DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getInvoice(context.query.q as string);
  return {
    props: {
      protected: true,
      invoiceItems: res.invoiceItems,
      invoiceData: res.invoice,
    },
  };
};
