import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faSackDollar, faClock, faCircleCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Invoice} from "../../../../../types/invoice";
import moment from "moment";
import {numberFormat} from "../../../../helpers";
import {useInvoice} from "../../../../hooks/useInvoice";


interface props {
    data: Invoice;
    deleteInvoice: (arg: string) => void;
    editInvoice: (arg: string) => void;
}

const Invoice = ({data, deleteInvoice, editInvoice}: props) => {

    const {editInvoiceRequest, deleteInvoiceRequest} = useInvoice();

    return (
        <div
            className="invoiceCard">
            <h2>{data.to}</h2>
            <p className="desc">
                {data.description.length > 120 ?
                    data.description.substring(0, 120)
                    + "..." : data.description}
            </p>
            <div className={`statusBox ${data.status === 'paid' ? 'paid' : 'unpaid'}`}>
                <FontAwesomeIcon className={"icon"} icon={faCircleCheck}/>
                    <p>
                        {data.status === 'paid' ? 'Paid' : 'Unpaid'}
                    </p>
            </div>
            <div className="details">
                <p className="amount">
                    <FontAwesomeIcon
                    className={"icon"}
                    icon={faSackDollar}/>
                    {`$${numberFormat(data.amount, 2)}`}
                </p>
                <p className="date">
                    <FontAwesomeIcon icon={faClock}
                    className={"icon"}
                    />
                    {moment(data.date).format("MMM Do YYYY")}
                </p>
                <p className="customer">
                    <FontAwesomeIcon icon={faUser}
                    className={"icon"}
                    />
                    {data.from}
                </p>
            </div>
            <div className="actions">
                <button onClick={() => {
                    editInvoiceRequest({
                        id: data.id,
                        field: 'status',
                        value: data.status === 'paid' ? 'unpaid' : 'paid'
                    }).then(() => {
                        editInvoice(data.id)
                    })
                }}>
                    {`Mark as ${data.status === 'paid' ? 'unpaid' : 'paid'}`}
                </button>
                <button onClick={() => {
                    deleteInvoiceRequest(data.id).then(() => {
                        deleteInvoice(data.id);
                    })
                }}>
                    Delete Invoice
                </button>
            </div>
            {/*<Link href={`invoices/edit/${data.id}`}>*/}
            {/*    <button className="button">Edit invoice</button>*/}
            {/*</Link>*/}
        </div>
    );
};

export default Invoice;
