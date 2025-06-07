import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../admincsscomponents/SubscribedUsers.css'; // ✅ Import the CSS file

const SubscribedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllSubscriptions()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch subscribed users:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="subscribed-users-container">
      <h2 className="subscribed-heading">Subscribed Users</h2>

      {loading ? (
        <div className="loader"></div>
      ) : users.length === 0 ? (
        <p className="no-users">No subscribers found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.email?.trim() ? user.email : 'No Email'}</td>
                  <td>{user.phone?.trim() ? user.phone : 'No Phone Number'}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscribedUsers;
