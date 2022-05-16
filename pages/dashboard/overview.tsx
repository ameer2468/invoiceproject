import React, {useState} from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import OverviewTabs from "../../src/components/page-specific/dashboard/Overview/OverviewTabs";
import InvoicesPaid from "../../src/components/page-specific/dashboard/Overview/InvoicesPaid";
import MoneyMade from "../../src/components/page-specific/dashboard/Overview/moneyMade";
import Dropdown from "../../src/components/global/dropdown";
import {useUser} from "../../src/UserContext";
import {useQuery} from "react-query";
import {getInvoices} from "../../src/services/invoices/services";
import Loading from "../../src/components/global/loading";
import {Invoice} from "../../types/invoice";
import InvoicesUnpaid from "../../src/components/page-specific/dashboard/Overview/InvoicesUnpaid";

const Overview = () => {



    const [activeTab, setActiveTab] = useState(0);
    const {user} = useUser();
    const userInfo = user[0];
    const {data: invoicesData, isLoading, isFetching, error} = useQuery('All invoices', getInvoices, {
        refetchOnWindowFocus: false
    })
    const paidInvoices = invoicesData?.invoices.filter((invoice: Invoice) => invoice.status === 'paid');
    const unpaidInvoices = invoicesData?.invoices.filter((invoice: Invoice) => invoice.status === 'unpaid');

    const TabContent = () => {
        switch (activeTab) {
            case 0:
                return <InvoicesPaid data={paidInvoices}/>;
            case 1:
                return <InvoicesUnpaid data={unpaidInvoices}/>;
            default:
                return <div>Tab 3</div>;
        }
    };


    return (
     <div className="overview">
             <div className="container">
                 <div className="main-header">
                     {userInfo.type === 'unauthenticated' ? "" :
                         <h1>Welcome, {userInfo.attributes['custom:firstname']}</h1>
                     }
                     <Dropdown onSelect={() => {
                     }} options={['Weekly', 'Daily', 'Monthly']}/>
                 </div>
                 {isLoading || isFetching ? <div style={{
                     position: "absolute",
                     top: "60%",
                     left: "55%",
                 }}>
                     <Loading style={'PulseLoader'} color={"black"}/>
                 </div>
                     :
                     <div className="overviewContent">
                         <OverviewTabs
                             invoiceValues={invoicesData}
                             activeTab={activeTab}
                             setActiveTab={(tab: number) => {
                                 setActiveTab(tab);
                             }}/>
                         <TabContent/>
                     </div>
                 }
             </div>
     </div>
    );
}

export default Overview;
Overview.Layout = DashboardLayout;

export async function getStaticProps(context: any) {
    return {
        props: {
            protected: true,
        },
    }
}
