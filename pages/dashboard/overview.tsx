import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import OverviewTabs from "../../src/components/page-specific/dashboard/Overview/OverviewTabs";
import InvoicesPaid from "../../src/components/page-specific/dashboard/Overview/InvoicesPaid";
import Dropdown from "../../src/components/global/dropdown";
import { useUser } from "../../src/UserContext";
import Loading from "../../src/components/global/loading";
import InvoicesUnpaid from "../../src/components/page-specific/dashboard/Overview/InvoicesUnpaid";
import Page from "../../src/components/global/Page";
import { useFetchOverviewInvoices } from "../../src/hooks/useInvoice";

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();
  const userInfo = user[0];
  const {
    unpaidInvoices,
    paidInvoices,
    isLoadingUnpaid,
    isLoading,
    isFetching,
    isFetchingUnpaid,
    setPeriod,
  } = useFetchOverviewInvoices();


  const TabContent = () => {
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
    <Page pageName={"overview"}>
      <div className="main-header">
        {userInfo.type === "unauthenticated" ? "" : <h1>Overview</h1>}
        <Dropdown
          onSelect={(option: string) => {
            setPeriod(option);
          }}
          options={["All", "1 day", "7 days", "30 days"]}
        />
      </div>
      {isLoading || isLoadingUnpaid || isFetchingUnpaid || isFetching ? (
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "55%",
          }}
        >
          <Loading style={"PulseLoader"} color={"white"} />
        </div>
      ) : (
        <div className="overviewContent">
          <OverviewTabs
            paidInvoices={paidInvoices}
            unpaidInvoices={unpaidInvoices}
            activeTab={activeTab}
            setActiveTab={(tab: number) => {
              setActiveTab(tab);
            }}
          />
          <TabContent />
        </div>
      )}
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
