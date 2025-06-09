import { useEffect, useState } from 'react';
import api from '../services/api';
import '../admincsscomponents/ContactList.css';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllContacts()
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch contacts:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="contact-container">
      <h2>Contact Submissions</h2>

      {loading ? (
        <div className="loader-wrapper">
          <div className="custom-loader"></div>
          <div className="loading-text">Loading contacts...</div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="no-contacts">No contact submissions found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="contact-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Reason</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={contact._id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <td>{i + 1}</td>
                  <td>{contact.firstName} {contact.lastName}</td>
                  <td>{contact.email?.trim() ? contact.email : 'No Email'}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.message}</td>
                  <td>{contact.reason}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactList;
