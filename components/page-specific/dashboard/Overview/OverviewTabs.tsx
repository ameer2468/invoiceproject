import React from 'react';

interface props {
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

const OverviewTabs = ({activeTab, setActiveTab}: props) => {

    const tabsArr = [
        {title: "Total invoices paid.", value: 56},
        {title: "Total money made.", value: "$7,541"},
        {title: "Amount due.", value: "$1,432"},
        {title: "Unpaid invoices.", value: 4},
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
