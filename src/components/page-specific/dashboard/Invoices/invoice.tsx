import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faSackDollar, faClock, faCircleCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Invoice} from "../../../../../types/invoice";
import moment from "moment";
import {numberFormat} from "../../../../helpers";
import Loading from "../../../global/loading";
import { motion } from 'framer-motion';
import {anim} from "../../../../framer";


interface props {
    data: Invoice;
    deleteInvoice: () => Promise<void>;
    editInvoice: () => Promise<void>;
}

const Invoice = ({data, deleteInvoice, editInvoice}: props) => {
    const [mutateLoading, setMutateLoading] = React.useState(false);
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    return (
        <motion.div
            initial={anim.initial}
            animate={anim.animate}
            transition={anim.transition}
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
                <button
                    disabled={mutateLoading}
                    className={mutateLoading ? "disabledButton" : ""}
                    onClick={() => {
                        setMutateLoading(true);
                        editInvoice().then(() => setMutateLoading(false));
                    }}>
                    {mutateLoading ? <Loading style={"PulseLoader"}/> : `Mark as ${data.status === 'paid' ? 'unpaid' : 'paid'}`}
                </button>
                <button
                    disabled={deleteLoading}
                    className={deleteLoading ? "disabledButton" : ""}
                    onClick={() => {
                        setDeleteLoading(true);
                        deleteInvoice().then(() => setDeleteLoading(false));
                    }}>
                    {deleteLoading ? <Loading style={"PulseLoader"}/> : "Delete Invoice"}
                </button>
            </div>
            {/*<Link href={`invoices/edit/${data.id}`}>*/}
            {/*    <button className="button">Edit invoice</button>*/}
            {/*</Link>*/}
        </motion.div>
    );
};

export default Invoice;
