import React from "react";
import TabSkeleton from "../../../skeletons/tab";

interface props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  paidInvoices: [] | undefined;
  unpaidInvoices: [] | undefined;
  loading: boolean;
}

const OverviewTabs = ({
  activeTab,
  setActiveTab,
  paidInvoices,
  unpaidInvoices,
  loading,
}: props) => {
  const tabsArr = [
    { title: "Total invoices paid.", value: paidInvoices?.length },
    { title: "Total Unpaid invoices.", value: unpaidInvoices?.length },
  ];
  return (
    <div className="tabs-wrap">
      {loading ? (
        <>
          <TabSkeleton />
          <TabSkeleton />
        </>
      ) : (
        tabsArr.map((tab, index) => {
          return (
            <div
              onClick={() => setActiveTab(index)}
              className={`${activeTab === index ? "active-tab" : "tab-item"}`}
              key={index}
            >
              <h2 className="tab-item-title">{tab.title}</h2>
              <p>{tab.value}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OverviewTabs;
