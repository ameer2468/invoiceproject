import React from 'react';

interface props {
    data: any;
}

const Record = ({data}: props) => {
    return (
       <div className="record">
           <p>{data.amount}</p>
           <p className="pink">{data.id}</p>
           <p>{data.date}</p>
           <p className="green">{data.status}</p>
       </div>
    );
};

export default Record;
