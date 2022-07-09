import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Input from "../../../src/components/global/Input";
import { useInvoice } from "../../../src/hooks/useInvoice";
import TextArea from "../../../src/components/global/Textarea";
import InvoiceItem from "../../../src/components/page-specific/dashboard/Invoices/newInvoice/InvoiceItem";
import { item } from "../../../types/invoice";
import DatePicker from "react-datepicker";
import PdfPage from "../../../src/components/page-specific/dashboard/Invoices/newInvoice/PdfPage";
import { PDFDownloadLink } from "@react-pdf/renderer";

import "react-datepicker/dist/react-datepicker.css";

import { numberFormat } from "../../../src/helpers";
import Loading from "../../../src/components/global/loading";
import { useFetchBankingInfo } from "../../../src/hooks/useSettings";

const New = () => {
  const [activePdf, setActivePdf] = useState(false);
  const {
    handleInputChange,
    handleItemChange,
    invoiceForm,
    handleCurrencyChange,
    handleCreateInvoice,
    createInvoiceLoading,
    removeInvoiceItem,
    updateInvoiceForm,
    updateMultiValues,
    toggleCalendar,
    handleDateChange,
    addItem,
  } = useInvoice();
  const { data } = useFetchBankingInfo();

  const totalCost = invoiceForm.invoiceItems.reduce((acc: any, item: any) => {
    const itemAmount = Number(item.amount);
    return acc + itemAmount;
  }, 0);

  /* Memoized value here to prevent
   * un-necessary re-renders - we only want to update the form
   * when total cost value changes */

  useMemo(() => {
    updateInvoiceForm("amount", totalCost.toString());
  }, [totalCost]);
  useEffect(() => {
    if (data) {
      updateMultiValues([
        { key: "account_number", value: data.account_number },
        { key: "sort_code", value: data.sort_code },
      ]);
    }
  }, [data]);

  return (
    <>
      {activePdf ? (
        <>
          <PdfPage invoiceInfo={invoiceForm} />
          <button
            onClick={() => setActivePdf(!activePdf)}
            style={{ position: "relative", zIndex: 20 }}
            className="downloadPdf"
          >
            Download Invoice
          </button>
        </>
      ) : (
        <div className="newInvoice">
          <div className="newInvoiceContainer">
            <h1>Invoice Details</h1>
            <div className="newInvoiceContent">
              <div className="col">
                <h2>Info</h2>
                <Input
                  name={"to"}
                  onChange={handleInputChange}
                  value={invoiceForm.to}
                  placeholder="Bill to"
                />
                <Input
                  name={"id"}
                  onChange={handleInputChange}
                  value={invoiceForm.id}
                  placeholder="Invoice Number"
                />
                <TextArea
                  name={"description"}
                  onChange={handleInputChange}
                  value={invoiceForm.description}
                  limitValue={300}
                  placeholder="Invoice Description"
                />
              </div>
              <div className="col">
                <h2>Date</h2>
                <input
                  type="date"
                  name="date"
                  disabled={true}
                  style={{ opacity: 0.5 }}
                  value={new Date().toISOString().split("T")[0]}
                  onChange={handleInputChange}
                />
                <h2>Due date</h2>
                <DatePicker
                  selected={invoiceForm.dueDate as Date}
                  onChange={(date) => handleDateChange(date)}
                  onCalendarClose={() => toggleCalendar(false)}
                  onCalendarOpen={() => toggleCalendar(true)}
                  calendarClassName="datePicker"
                />
              </div>
              <div className="col">
                <h2>Item</h2>
                <div className="itemInfo">
                  {invoiceForm.invoiceItems.map((value: item, index: number) => {
                    return (
                      <InvoiceItem
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handleItemChange(e, index);
                        }}
                        index={index}
                        key={index.toString()}
                        handleCurrencyChange={(value, name, index) => {
                          if (value && name) {
                            handleCurrencyChange(value, name, index);
                          }
                        }}
                        removeItem={() => removeInvoiceItem(index)}
                        item={invoiceForm.invoiceItems[index]}
                      />
                    );
                  })}
                  <button onClick={addItem} className="addItem">
                    + Add item
                  </button>
                </div>
              </div>
              <div className="terms">
                <div className="col">
                  <h2>Payment & Terms</h2>
                  <div className="miscInfo">
                    <div className="col">
                      <TextArea
                        placeholder={"Notes"}
                        value={invoiceForm.notes}
                        name={"notes"}
                        onChange={handleInputChange}
                      />
                      <TextArea
                        placeholder={"Terms and conditions"}
                        value={invoiceForm.tos}
                        name={"tos"}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col">
                      <h2 className="totalAmount" style={{ marginBottom: "0" }}>
                        Amount to be paid
                      </h2>
                      <p className="amount">${numberFormat(totalCost, 2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={`button ${createInvoiceLoading && "disabledButton"}`}
              disabled={createInvoiceLoading}
              style={{ marginTop: "3rem" }}
              onClick={() => {
                handleCreateInvoice();
              }}
            >
              {createInvoiceLoading ? <Loading style="PulseLoader" /> : "Create Invoice"}
            </button>
            <button onClick={() => setActivePdf(!activePdf)} className="downloadPdf">
              Download Invoice
            </button>
            {/*<PDFDownloadLink document={<PdfPage />} fileName="invoice.pdf">*/}
            {/*  <button onClick={() => setActivePdf(!activePdf)} className="downloadPdf">*/}
            {/*    Download Invoice*/}
            {/*  </button>*/}
            {/*</PDFDownloadLink>*/}
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}

export default New;
New.Layout = DashboardLayout;
