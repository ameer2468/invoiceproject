import React from 'react';
import Record from "./record";
import { Scrollbars } from 'react-custom-scrollbars-2';
import SearchBox from "../../../global/SearchBox";


const InvoicesPaid = () => {

    const payments = [
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
        {amount: '$1,543', id: 'B123Ava23', date: '12/12/2019', status: 'Paid'},
    ]

    return (
        <div className="InvoicesPaid">
            <div className="invoicesContainer">
                <SearchBox placeholder="Seach invoice id..."/>
                <div className="col-headings">
                    <h3>Amount</h3>
                    <h3>Invoice #</h3>
                    <h3>Date</h3>
                    <h3>Status</h3>
                </div>
                <Scrollbars style={{ width: "100%", height: 450 }}>
                    {payments.map((value, index) => {
                        return (
                            <Record key={index.toString()} data={value}/>
                        )
                    })}
                </Scrollbars>
            </div>
        </div>
    );
};

export default InvoicesPaid;
