import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Page from "../../../src/components/global/Page";
import { getInvoice } from "../../../src/services/invoices/services";
import { InvoiceData, item } from "../../../types/invoice";
import moment from "moment";
import { numberFormat } from "../../../src/helpers";
import Loading from "../../../src/components/global/loading";
import { useInvoice, useInvoiceData } from "../../../src/hooks/useInvoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../src/components/global/dropdown";
import CurrencyInput from "react-currency-input-field";
import { GetServerSideProps } from "next";

interface props {
  invoiceData: InvoiceData;
  invoiceItems: item[];
}

const Invoice = ({ invoiceData, invoiceItems }: props) => {
  const { invoiceForm, handleCurrencyValueChange, setInvoiceForm } = useInvoice();
  const {
    invoice,
    invoiceMutate,
    editInvoiceMode,
    editInvoiceHandler,
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

  return (
    <Page pageName={"invoiceId"}>
      <div className="action-buttons">
        <h1>{invoice?.to}</h1>
        <button
          className="purpleButton"
          onClick={() => {
            editInvoiceHandler(invoice as InvoiceData);
          }}
        >
          Edit
        </button>
        <button
          disabled={mutateLoading.delete}
          onClick={() => {
            deleteInvoiceRequest(invoice?.id as string);
          }}
          className={`pinkButton ${mutateLoading.delete && "disabledButton"}`}
        >
          {mutateLoading.delete ? <Loading style="PulseLoader" /> : "Delete"}
        </button>
      </div>
      <div className="description">
        <p>{invoice?.description}</p>
      </div>
      <div className="stats">
        <div className="stat">
          <p className="bold">Id:</p>
          <p>{invoice?.id}</p>
        </div>
        <div className="stat">
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
                className={invoice?.amount === invoiceForm.amount ? "disabledButton" : ""}
                onClick={() => {
                  invoiceMutate("amount");
                }}
              >
                Confirm
              </button>
            </div>
          ) : (
            <>
              <p className="bold">Amount:</p>
              {mutateLoading.amount ? (
                <Loading style={"PulseLoader"} />
              ) : (
                <p>${numberFormat(Number(invoice?.amount), 2)}</p>
              )}
            </>
          )}
        </div>
        <div className="stat">
          <p className="bold">Status:</p>
          <p className={invoice?.status === "paid" ? "paid" : "unpaid"}>
            {editInvoiceMode ? "" : invoice?.status}
          </p>
          <div>
            {mutateLoading.status ? (
              <Loading style={"PulseLoader"} />
            ) : (
              editInvoiceMode && (
                <Dropdown
                  defaultValue={"Status"}
                  options={invoice?.status === "paid" ? ["unpaid"] : ["paid"]}
                  style={{ backgroundColor: "#252525" }}
                  onSelect={() => {
                    invoiceMutate("status");
                  }}
                />
              )
            )}
          </div>
        </div>
        <div className="stat">
          <p className="bold">Date:</p>
          <p>{moment(invoice?.date).format("MMM Do YYYY")}</p>
        </div>
      </div>
      <h1>Invoice Items</h1>
      <div className="items">
        {invoice?.invoiceItems.map((item) => {
          return (
            <div key={item.id} className="i-item">
              <h2>{item.description}</h2>
              <div className="info">
                <p>
                  <FontAwesomeIcon className="icon" icon={faMoneyBill} />
                  Amount: ${item.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
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
      invoiceData: res.invoice[0],
    },
  };
};
