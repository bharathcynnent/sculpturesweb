import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../admincsscomponents/UsersDetails.css';
const UsersDetails = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const excludedKeys = ['id', '_id', '__v'];

  useEffect(() => {
    api.getAllUserData()
      .then((data) => {
        setUsersData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch contacts:', err.message);
        setLoading(false);
      });
  }, []);

  const displayKeys = usersData.length > 0
    ? Object.keys(usersData[0]).filter(k => !excludedKeys.includes(k))
    : [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Users Details</h2>

        {loading ? (
          <div className="spinner"></div>
        ) : usersData.length === 0 ? (
          <p className="empty-message">No user data available.</p>
        ) : (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                 {displayKeys.map((key) => (
                  <th key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    {displayKeys.map((key) => (
                      <td key={key}>
                        {typeof user[key] === 'object'
                          ? JSON.stringify(user[key])
                          : user[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
