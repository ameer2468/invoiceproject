import React, {useState} from 'react';
import DashboardLayout from "../../../layouts/DashboardLayout";
import Page from "../../../src/components/global/Page";
import {getAllInvoices, getInvoice} from "../../../src/services/invoices/services";
import {invoiceData, item} from "../../../types/invoice";
import moment from "moment";
import {numberFormat} from "../../../src/helpers";
import Loading from "../../../src/components/global/loading";
import {useInvoice} from "../../../src/hooks/useInvoice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBill, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

interface props {
    invoiceData: {
        invoice: invoiceData[],
        invoiceItems: item[];
    }
}

const Invoice = ({invoiceData}: props) => {
    const [mutateLoading, setMutateLoading] = React.useState(false);
    const [invoiceInfo, setInvoiceInfo] = useState(invoiceData.invoice[0])
    const invoiceItems = invoiceData.invoiceItems;
    const {editInvoiceRequest} = useInvoice();

    const editInvoice = () => {
        setMutateLoading(true)
        editInvoiceRequest({
            id: invoiceInfo.id, field: "status", value: invoiceInfo.status === "paid" ? "unpaid" : "paid"
        }).then(() => {
            setMutateLoading(false)
            setInvoiceInfo({...invoiceInfo, status: invoiceInfo.status === "paid" ? "unpaid" : "paid"})
        })
    }

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
                    <button
                        onClick={editInvoice}
                        disabled={mutateLoading}
                        className={mutateLoading ? "disabledButton" : ""}
                       >
                        {mutateLoading ? <Loading style={"PulseLoader"}/> : `Mark as ${invoiceInfo.status === 'paid' ? 'unpaid' : 'paid'}`}
                    </button>
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
                                <p>
                                    <FontAwesomeIcon className='icon' icon={faLayerGroup}/>
                                    Quantity: {item.quantity}</p>
                                <p>
                                    <FontAwesomeIcon className='icon' icon={faMoneyBill}/>
                                    Rate: {item.rate}
                                </p>
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
    }
}



