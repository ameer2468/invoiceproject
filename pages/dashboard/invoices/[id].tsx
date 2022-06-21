import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Page from "../../../src/components/global/Page";
import {
  getAllInvoices,
  getInvoice,
} from "../../../src/services/invoices/services";
import { InvoiceData, item } from "../../../types/invoice";
import moment from "moment";
import { numberFormat } from "../../../src/helpers";
import Loading from "../../../src/components/global/loading";
import { useInvoice, useInvoiceData } from "../../../src/hooks/useInvoice";
import Input from "../../../src/components/global/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../src/components/global/dropdown";
import CurrencyInput from "react-currency-input-field";

interface props {
  invoiceData: InvoiceData;
  invoiceItems: item[];
}

const Invoice = ({ invoiceData, invoiceItems }: props) => {
  const {
    invoiceForm,
    handleCurrencyValueChange,
    handleInputChange,
    setInvoiceForm,
  } = useInvoice();
  const {
    invoice,
    invoiceMutate,
    editInvoiceMode,
    editInvoiceHandler,
    mutateLoading,
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
      <div className="flex">
        <h1>{invoice?.to}</h1>
        <div
          className="edit"
          onClick={() => {
            editInvoiceHandler(invoice as InvoiceData);
          }}
        >
          Edit
        </div>
      </div>
      <div className="stats">
        {mutateLoading ? (
          <div className="absoluteCenter">
            <Loading style={"PulseLoader"} />
          </div>
        ) : (
          <>
            <div className="stat">
              {editInvoiceMode ? (
                <div className="flex">
                  <Input
                    name="id"
                    placeholder="id"
                    value={invoiceForm.id}
                    onChange={handleInputChange}
                  />
                  <button
                    disabled={invoice?.id === invoiceForm.id}
                    className={
                      invoice?.id === invoiceForm.id ? "disabledButton" : ""
                    }
                    onClick={() => {
                      invoiceMutate("id");
                    }}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <>
                  <p className="bold">Id:</p>
                  <p>{invoice?.id}</p>
                </>
              )}
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
                    className={
                      invoice?.amount === invoiceForm.amount
                        ? "disabledButton"
                        : ""
                    }
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
                  <p>${numberFormat(Number(invoice?.amount), 2)}</p>
                </>
              )}
            </div>
            <div className="stat">
              <p className="bold">Status:</p>
              <p className={invoice?.status === "paid" ? "paid" : "unpaid"}>
                {mutateLoading ? (
                  <Loading style={"PulseLoader"} />
                ) : editInvoiceMode ? (
                  <Dropdown
                    defaultValue={"Status"}
                    options={invoice?.status === "paid" ? ["unpaid"] : ["paid"]}
                    style={{ backgroundColor: "#252525" }}
                    onSelect={() => {
                      invoiceMutate("status");
                    }}
                  />
                ) : (
                  invoice?.status
                )}
              </p>
            </div>
            <div className="stat">
              <p className="bold">Date:</p>
              <p>{moment(invoice?.date).format("MMM Do YYYY")}</p>
            </div>
          </>
        )}
      </div>
      <h1>Invoice Items</h1>
      <div className="items">
        {invoice?.invoiceItems.map((item) => {
          return (
            <div key={item.id} className="i-item">
              <h2>${numberFormat(item.amount as number, 2)}</h2>
              <p>
                This is an invoice item description. lorem ipsum greence anarky
                orem sim neb{" "}
              </p>
              <div className="info">
                <p>
                  <FontAwesomeIcon className="icon" icon={faLayerGroup} />
                  Quantity: {item.quantity}
                </p>
                <p>
                  <FontAwesomeIcon className="icon" icon={faMoneyBill} />
                  Rate: {item.rate}
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

export async function getStaticPaths() {
  const { invoices } = await getAllInvoices();
  const paths = invoices.map((invoice: InvoiceData) => ({
    params: { id: invoice.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await getInvoice(params.id);
  return {
    props: {
      protected: true,
      invoiceItems: res.invoiceItems,
      invoiceData: res.invoice[0],
    },
  };
}
