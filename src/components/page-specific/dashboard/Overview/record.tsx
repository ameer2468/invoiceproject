import React from 'react';
import {numberFormat} from "../../../../helpers";
import moment from "moment";

interface props {
    data: any;
}

const Record = ({data}: props) => {
    return (
       <div className="record">
           <p>${numberFormat(data.amount, 2)}</p>
           <p className="pink">{data.id}</p>
           <p>{moment(data.date).format("LL")}</p>
           <p className={`${data.status === 'paid' ? 'paid' : 'unpaid'}`}>{data.status}</p>
       </div>
    );
};

export default Record;
