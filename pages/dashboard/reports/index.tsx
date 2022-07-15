import React from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import Page from '../../../src/components/global/Page';
import { BarChart } from '../../../src/components/page-specific/dashboard/BarChart';
import { LineChart } from '../../../src/components/page-specific/dashboard/LineChart';

const Reports = () => {
  return (
    <Page pageName={'reports'}>
      <h1>Reports</h1>
      <div className="contentBox">
        <BarChart />
      </div>
      <div className="contentBox">
        <LineChart />
      </div>
    </Page>
  );
};

export default Reports;
Reports.Layout = DashboardLayout;
