import React from 'react';
import '../admincsscomponents/AdminCharts.css';

import UserVisitChart from '../adminCompoents/Charts/UserVisitChart';
import ContactStatsChart from '../adminCompoents/Charts/ContactStatsChart';
import PurchasedUsersChart from '../adminCompoents/Charts/PurchasedUsersChart';
import SubscribedUsersChart from '../adminCompoents/Charts/SubscribedUsersChart';

const AdminCharts = () => {
  return (
    <div className="admin-chart-container">
      <h1 className="admin-chart-title">Dashboard</h1>
      <div className="chart-grid">
        <div className="chart-card"><UserVisitChart /></div>
        <div className="chart-card"><ContactStatsChart /></div>
        <div className="chart-card"><PurchasedUsersChart /></div>
        <div className="chart-card"><SubscribedUsersChart /></div>
      </div>
    </div>
  );
};

export default AdminCharts;
