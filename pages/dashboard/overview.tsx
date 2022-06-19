import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import OverviewTabs from "../../src/components/page-specific/dashboard/Overview/OverviewTabs";
import InvoicesPaid from "../../src/components/page-specific/dashboard/Overview/InvoicesPaid";
import Dropdown from "../../src/components/global/dropdown";
import { useUser } from "../../src/UserContext";
import { useQuery } from "react-query";
import {
  getPaidInvoices,
  getUnpaidInvoices,
} from "../../src/services/invoices/services";
import Loading from "../../src/components/global/loading";
import InvoicesUnpaid from "../../src/components/page-specific/dashboard/Overview/InvoicesUnpaid";
import Page from "../../src/components/global/Page";

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useUser();
  const userInfo = user[0];
  const {
    data: paidInvoices,
    isLoading,
    isFetching,
    error,
  } = useQuery("All invoices", getPaidInvoices, {
    refetchOnWindowFocus: false,
  });
  const {
    data: unpaidInvoices,
    isLoading: isLoadingUnpaid,
    isFetching: isFetchingUnpaid,
    error: errorUnpaid,
  } = useQuery("All unpaid invoices", getUnpaidInvoices, {
    refetchOnWindowFocus: false,
  });

  const TabContent = () => {
    switch (activeTab) {
      case 0:
        return <InvoicesPaid data={paidInvoices.invoices} />;
      case 1:
        return <InvoicesUnpaid data={unpaidInvoices.invoices} />;
      default:
        return <div>Tab 3</div>;
    }
  };

  return (
    <Page pageName={"overview"}>
      <div className="main-header">
        {userInfo.type === "unauthenticated" ? "" : <h1>Overview</h1>}
        <Dropdown
          onSelect={() => {}}
          options={["Weekly", "Daily", "Monthly"]}
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
            paidInvoices={paidInvoices.invoices}
            unpaidInvoices={unpaidInvoices.invoices}
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
