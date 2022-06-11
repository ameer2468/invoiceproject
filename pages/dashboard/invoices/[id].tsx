import React from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Page from "../../../src/components/global/Page";
import {getAllInvoices, getInvoice} from "../../../src/services/invoices/services";
import {invoiceData, item} from "../../../types/invoice";
import moment from "moment";
import {numberFormat} from "../../../src/helpers";

interface props {
    invoiceData: {
        invoice: invoiceData[],
        invoiceItems: item[];
    }
}

const Invoice = ({invoiceData}: props) => {
    console.log(invoiceData)
    const invoiceInfo = invoiceData.invoice[0];
    const invoiceItems = invoiceData.invoiceItems;
    return (
        <Page pageName={'invoiceId'}>
            <h1>{invoiceInfo.to}</h1>
            <div className="stats">
                <div className="stat">
                    <p>Id:</p>
                    <p>{invoiceInfo.id}</p>
                </div>
                <div className="stat">
                    <p>Amount:</p>
                    <p>{invoiceInfo.amount}</p>
                </div>
                <div className="stat">
                    <p>Status:</p>
                    <p className={invoiceInfo.status === 'paid' ? 'paid' : 'unpaid'}>{invoiceInfo.status}</p>
                </div>
                <div className="stat">
                    <p>Date:</p>
                    <p>{moment(invoiceInfo.date).format("MMM Do YYYY")}</p>
                </div>
            </div>
            <h1>Invoice Items</h1>
            <div className="items">
                {invoiceItems.map((item) => {
                    return (
                        <div key={item.id} className="i-item">
                                <h2>${numberFormat(item.amount as number, 2)}</h2>
                            <p>This is an invoice item description.
                                lorem ipsum greence anarky orem sim neb </p>
                            <div className="info">
                                <p>Quantity: {item.quantity}</p>
                                <p>Rate: {item.rate}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Page>
    );
};

export default Invoice;
Invoice.Layout = DashboardLayout;

export async function getStaticPaths() {
    const { invoices } = await getAllInvoices();
    const paths = invoices.map((invoice: invoiceData) => ({
        params: {id: invoice.id}
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
            invoiceData: res
        },
        revalidated: 1
    }
}



