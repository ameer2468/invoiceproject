import React from 'react';
import {numberFormat} from "../../../../helpers";
import {Invoice} from "../../../../../types/invoice";

interface props {
    activeTab: number;
    setActiveTab: (tab: number) => void;
    invoiceValues: {invoices: []};
}

const OverviewTabs = ({activeTab, setActiveTab, invoiceValues}: props) => {

    const {invoices} = invoiceValues;
    const totalMoneyMade = invoices.filter((invoice: Invoice) => {
        return invoice.status === 'paid';
    }).reduce((acc, curr: any) => {
        return acc + Number(curr.amount);
    },0)
    const unpaidInvoices = invoices.filter((invoice: Invoice) => {
        return invoice.status === 'unpaid';
    });

    const tabsArr = [
        {title: "Total invoices paid.", value: invoices.length},
        {title: "Total Unpaid invoices.", value: unpaidInvoices.length},
        {title: "Amount due.", value: "$1,432"},
    ]

    return (
        <div className="tabs-wrap">
            {tabsArr.map((tab, index) => {
                return (
                    <div onClick={() => setActiveTab(index)}
                         className={`${activeTab === index ? "active-tab" : "tab-item"}`}
                         key={index}>
                        <h2 className="tab-item-title">{tab.title}</h2>
                        <p>{tab.value}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default OverviewTabs;
