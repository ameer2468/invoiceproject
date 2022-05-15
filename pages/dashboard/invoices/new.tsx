import React, {useState, ChangeEvent} from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Input from '../../../src/components/global/Input';
import {useInvoice} from "../../../src/hooks/useInvoice";
import TextArea from "../../../src/components/global/Textarea";
import InvoiceItem from "../../../src/components/page-specific/dashboard/Invoices/newInvoice/InvoiceItem";
import {item} from "../../../types/invoice";
import PdfPage from "../../../src/components/page-specific/dashboard/Invoices/newInvoice/PdfPage";

import "react-datepicker/dist/react-datepicker.css";

const New = () => {
    const [activePdf, setActivePdf] = useState(false);
    const {
        handleInputChange,
        handleItemChange,
        invoiceForm,
        handleCurrencyChange,
        removeInvoiceItem,
        addItem } = useInvoice();


    return (
        <>
            {activePdf ?  <>
                <PdfPage invoiceInfo={invoiceForm}/>
                <button
                    onClick={() => setActivePdf(!activePdf)}
                    style={{position: "relative", zIndex: 20}}
                    className="downloadPdf">
                    Download Invoice
                </button>
                </>
                :
                <div className="newInvoice">
                    <div className="newInvoiceContainer">
                        <h1>Invoice Details</h1>
                        <div className="newInvoiceContent">
                            <div className="col">
                                <TextArea
                                    placeholder={"Who is this invoice from?"}
                                    value={invoiceForm.from}
                                    name={"from"}
                                    onChange={handleInputChange}/>
                                <Input
                                    name={'billTo'}
                                    onChange={handleInputChange}
                                    value={invoiceForm.billTo}
                                    placeholder="Bill to"
                                />
                            </div>
                            <div className="col">
                                <Input
                                    name={'invoiceNumber'}
                                    onChange={handleInputChange}
                                    value={invoiceForm.invoiceNumber}
                                    placeholder="Invoice Number"
                                />
                                <h2>Date</h2>
                                <input type="date"
                                       name="date"
                                       disabled={true}
                                       value={new Date().toISOString().split('T')[0]}
                                       onChange={handleInputChange}
                                       />
                                <h2>Due date</h2>
                                <input type="date"
                                       name="dueDate"
                                       onChange={handleInputChange}
                                />
                            </div>
                            <div className="col">
                                <h2>Item</h2>
                                <div className="itemInfo">
                                    {invoiceForm.item.map((value: item, index: number) => {
                                        return (
                                                <InvoiceItem
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                        handleItemChange(e, index)
                                                    }}
                                                    index={index}
                                                    key={index.toString()}
                                                    handleCurrencyChange={(value, name, index) => {
                                                        if (value && name) {
                                                            handleCurrencyChange(value, name, index)
                                                        }
                                                    }}
                                                    removeItem={() => removeInvoiceItem(index)}
                                                    item={invoiceForm.item[index]}
                                                />
                                        )
                                    })}
                                    <button onClick={addItem} className="addItem">+ Add item</button>
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
                                                onChange={handleInputChange}/>
                                            <TextArea
                                                placeholder={"Terms and conditions"}
                                                value={invoiceForm.tos}
                                                name={"tos"}
                                                onChange={handleInputChange}/>
                                        </div>
                                        <div className="col">
                                            <div className="tax">
                                                <h2>Tax</h2>
                                                <input type="text" placeholder="0%"/>
                                            </div>
                                            <h2 style={{marginBottom: "0"}}>Amount to be paid</h2>
                                            <p className="amount">$0.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<PDFDownloadLink document={<PdfPage />} fileName="invoice.pdf">*/}
                        <button
                            onClick={() => setActivePdf(!activePdf)}
                            className="downloadPdf">
                            Download Invoice
                        </button>
                        {/*</PDFDownloadLink>*/}
                    </div>
                </div>
            }

        </>
    );
};

export async function getStaticProps(context: any) {
    return {
        props: {
            protected: true,
        },
    }
}

export default New;
New.Layout = DashboardLayout;
