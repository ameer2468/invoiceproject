import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import OverviewTabs from '../../src/components/page-specific/dashboard/Overview/OverviewTabs';
import InvoicesPaid from '../../src/components/page-specific/dashboard/Overview/InvoicesPaid';
import Dropdown from '../../src/components/global/dropdown';
import { useUser } from '../../src/UserContext';
import InvoicesUnpaid from '../../src/components/page-specific/dashboard/Overview/InvoicesUnpaid';
import Page from '../../src/components/global/Page';
import { useFetchOverviewInvoices } from '../../src/hooks/useInvoice';
import SquareSkeleton from '../../src/components/skeletons/square';

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();
  const userInfo = user;
  const {
    unpaidInvoices,
    paidInvoices,
    isLoadingUnpaid,
    isLoading,
    isFetching,
    isFetchingUnpaid,
    setPeriod,
  } = useFetchOverviewInvoices();

  const TabContent = ({ loading }: { loading: boolean }) => {
    const Tabs = () => {
      switch (activeTab) {
        case 0:
          return <InvoicesPaid data={paidInvoices} />;
        case 1:
          return <InvoicesUnpaid data={unpaidInvoices} />;
        default:
          return <div>Tab 3</div>;
      }
    };
    return (
      <>{loading ? <SquareSkeleton width={1105} height={560} /> : <Tabs />}</>
    );
  };

  return (
    <Page pageName={'overview'}>
      <div className="main-header">
        {userInfo.user.type === 'unauthenticated' ? '' : <h1>Overview</h1>}
        <Dropdown
          onSelect={(option: string) => {
            setPeriod(option);
          }}
          options={['All', '1 day', '7 days', '30 days']}
        />
      </div>
      <div className="overviewContent">
        <OverviewTabs
          loading={
            isLoading || isLoadingUnpaid || isFetchingUnpaid || isFetching
          }
          paidInvoices={paidInvoices}
          unpaidInvoices={unpaidInvoices}
          activeTab={activeTab}
          setActiveTab={(tab: number) => {
            setActiveTab(tab);
          }}
        />
        <TabContent
          loading={
            isLoading || isLoadingUnpaid || isFetchingUnpaid || isFetching
          }
        />
      </div>
    </Page>
  );
};

export default Overview;
Overview.Layout = DashboardLayout;

export async function getStaticProps(context: any) {
  return {
    props: {
      protected: true,
    },
  };
}
