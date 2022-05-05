import React, {useState} from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import OverviewTabs from "../../src/components/page-specific/dashboard/Overview/OverviewTabs";
import InvoicesPaid from "../../src/components/page-specific/dashboard/Overview/InvoicesPaid";
import MoneyMade from "../../src/components/page-specific/dashboard/Overview/moneyMade";
import Dropdown from "../../src/components/global/dropdown";
import {useUser} from "../../src/UserContext";

const Overview = () => {

    const [activeTab, setActiveTab] = useState(0);
    const {user} = useUser();
    const userInfo = user[0];

    const TabContent = () => {
        switch (activeTab) {
            case 0:
                return <InvoicesPaid/>;
            case 1:
                return <MoneyMade/>;
            case 2:
                return <div>Tab 2</div>;
            default:
                return <div>Tab 3</div>;
        }
    };

    return (
     <div className="overview">
         <div className="container">
             <div className="main-header">
                 {userInfo.type === 'unauthenticated' ? "" :
                     <h1>Welcome, {userInfo.attributes['custom:name']}</h1>
                 }
                 <Dropdown onSelect={(option) => {
                 }} options={['Weekly', 'Daily', 'Monthly']}/>
             </div>
             <div className="overviewContent">
                 <OverviewTabs activeTab={activeTab} setActiveTab={(tab: number) => {
                     setActiveTab(tab);
                 }}/>
                 <TabContent/>
             </div>
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
            userTypes: ["authenticated"],
        },
    }
}
