import React from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Page from "../../../src/components/global/Page";
import {getAllInvoices, getInvoice} from "../../../src/services/invoices/services";
import {Invoice as InvoiceData} from "../../../types/invoice";

const Invoice = (props: {invoiceData: {}}) => {
    console.log(props.invoiceData)
    return (
        <Page pageName={'invoiceId'}>
            <h1>Hello</h1>
        </Page>
    );
};

export default Invoice;
Invoice.Layout = DashboardLayout;

export async function getStaticPaths() {
    const { invoices } = await getAllInvoices();
    const paths = invoices.map((invoice: InvoiceData) => ({
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
    }
}



