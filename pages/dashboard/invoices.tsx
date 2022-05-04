import React from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import Invoice from "../components/page-specific/dashboard/Invoices/invoice";

const Invoices = () => {
    return (
        <div className="invoices">
            <div className="invoicesContainer">
                <h1>Invoices</h1>
                <div className="cards">
                    {Array.from(Array(6).keys()).map((item, index) => (
                        <Invoice key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Invoices;
Invoices.Layout = DashboardLayout;
