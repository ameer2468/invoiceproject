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

const Overview = () => {



    const [activeTab, setActiveTab] = useState(0);
    const {user} = useUser();
    const userInfo = user[0];
    const {data: invoicesData, isLoading, isFetching, error} = useQuery('All invoices', getInvoices, {
        refetchOnWindowFocus: false
    })

    const TabContent = () => {
        switch (activeTab) {
            case 0:
                return <InvoicesPaid data={invoicesData}/>;
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
             {isLoading || isFetching ? <div className="absoluteCenter">
                 <Loading size={13} style={'PulseLoader'} color={"black"}/>
             </div> :
             <>
                 <div className="main-header">
                     {userInfo.type === 'unauthenticated' ? "" :
                         <h1>Welcome, {userInfo.attributes['custom:firstname']}</h1>
                     }
                     <Dropdown onSelect={() => {
                     }} options={['Weekly', 'Daily', 'Monthly']}/>
                 </div>
                 <div className="overviewContent">
                     <OverviewTabs activeTab={activeTab} setActiveTab={(tab: number) => {
                         setActiveTab(tab);
                     }}/>
                     <TabContent/>
                 </div>
             </>
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
