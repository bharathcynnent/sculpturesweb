import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBoxOpen,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../admincsscomponents/AdminHeader.css';

const AdminHeader = ({ onNavigate, onLogout }) => {
  const [showModal, setShowModal] = useState(false);

  const confirmLogout = () => {
    onLogout();
    setShowModal(false);
  };

  return (
    <>
      <div className="admin-header">
        <div className="nav-buttons">
          <NavButton icon={<FaTachometerAlt />} label="Users Details" onClick={() => onNavigate('admin-dashboard')} />
          <NavButton icon={<FaEnvelope />} label="Contacted Users" onClick={() => onNavigate('admin-emails')} />
          <NavButton icon={<FaBoxOpen />} label="Subscribed Users" onClick={() => onNavigate('admin-products')} />
          <NavButton icon={<FaUsers />} label="Purchased Users" onClick={() => onNavigate('admin-users')} />
        </div>
        <button className="logout-btn" onClick={() => setShowModal(true)}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmLogout}>Yes, Logout</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button className="nav-button" onClick={onClick}>
    {icon}
    <span>{label}</span>
  </button>
);

export default AdminHeader;
