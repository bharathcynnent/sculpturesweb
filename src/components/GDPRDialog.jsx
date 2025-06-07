import React from 'react';

const GDPRDialog = ({ onAccept, onDecline }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #F7F8F4, #F7F8F4)',
      padding: '20px',
      borderTop: '2px solid #ddd',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
    }}>
      <p style={{
        flex: '1 1 300px',
        margin: '10px 20px 10px 0',
        fontSize: '16px',
        color: '#333',
        lineHeight: '1.5',
      }}>
        We collect anonymous usage data (e.g. IP address, city, device type, screen size, browser) to improve user experience.
        By using this site, you consent to this tracking in accordance with GDPR regulations.
      </p>

      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      }}>
        <button
          onClick={onAccept}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#45A049'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#e53935'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#f44336'}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default GDPRDialog;
