import React, { useState } from 'react';
import AdminHeader from '../adminCompoents/AdminHeader';
import UsersDetails from '../pages/UsersDetails';
import ContactedUsers from '../pages/ContactedUsers';
import SubscribedUsers from '../pages/SubscribedUsers';
import PurchasedUsers from '../pages/PurchasedUsers';
import AdminCharts from '../adminCompoents/AdminCharts';

const AdminPage = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('admin-charts');

  const renderContent = () => {
    switch (activePage) {
      case 'admin-dashboard':
        return <UsersDetails />;
      case 'admin-emails':
        return <ContactedUsers />;
      case 'admin-products':
        return <SubscribedUsers />;
      case 'admin-users':
        return <PurchasedUsers />;
      case 'admin-charts':
        return <AdminCharts/>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div>
      <AdminHeader onNavigate={setActivePage} onLogout={onLogout} />
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
