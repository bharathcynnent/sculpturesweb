import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaPlusCircle,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaBoxOpen,
  FaDollarSign,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "../admincsscomponents/PurchasedUsers.css";
import api from "../services/api";

const PurchasedUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    comments: "",
    productName: "",
    price: "",
    deliveryDate: "",
  });
  const [activeTab, setActiveTab] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const resetFormState = () => {
    setForm({
      name: "",
      email: "",
      address: "",
      phone: "",
      comments: "",
      productName: "",
      price: "",
      deliveryDate: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
    setActiveTab("list");
  };

  useEffect(() => {
    api.getAllPurchasedUsers().then(setUsers).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, productName, price, deliveryDate } = form;

    if (!name || !phone || !productName || !price || !deliveryDate) {
      Swal.fire("Missing Fields", "Please fill in all required fields.", "warning");
      return;
    }
     setUserIsLoading(true);
    try {
      if (isEditMode && form._id) {
        const updated = await api.updatePurchasedUser(form._id, form);
        const newUsers = [...users];
        newUsers[editIndex] = updated;
        setUsers(newUsers);
        Swal.fire("Updated!", "User details updated successfully.", "success");
      } else {
        const created = await api.addPurchasedUser(form);
        setUsers((prev) => [created, ...prev]);
        Swal.fire("Added!", "User added successfully.", "success");
      }

      resetFormState();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
    setUserIsLoading(false);
  }
  };

  const handleDelete = (index) => {
    const user = users[index];
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeletingIndex(index);
        try {
          await api.deletePurchasedUser(user._id);
          setUsers(users.filter((_, i) => i !== index));
          setSelectedUser(null);
          Swal.fire("Deleted!", "User has been removed.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }finally {
        setDeletingIndex(null); // End loader
      }
      }
    });
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setForm(userToEdit);
    setIsEditMode(true);
    setEditIndex(index);
    setSelectedUser(null);
    setActiveTab("add");
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="page-container">
      <h2 className="purchase-title">Purchased Users</h2>

      <div className="toggle-buttons">
        <button className={activeTab === "add" ? "active" : ""} onClick={() => {
          setActiveTab("add");
          setIsEditMode(false);
          setForm({
            name: "",
            email: "",
            address: "",
            phone: "",
            comments: "",
            productName: "",
            price: "",
            deliveryDate: "",
          });
        }}>
          <FaPlusCircle /> Add User
        </button>
        <button className={activeTab === "list" ? "active" : ""} onClick={() => setActiveTab("list")}>
          <FaUsers /> View Users
        </button>
      </div>

      {activeTab === "add" && (
        <div className="form-section fadeIn">
          <h3>{isEditMode ? "Edit User" : "Add New User"}</h3>
          <form className="add-user-form" onSubmit={handleSubmit}>
            {[
              { label: "Full Name", name: "name", required: true },
              { label: "Email", name: "email", type: "email", },
              { label: "Address", name: "address" },
              { label: "Phone", name: "phone", required: true },
              { label: "Comments", name: "comments", type: "textarea" },
              { label: "Product Name", name: "productName", required: true },
              { label: "Price", name: "price", type: "number", required: true },
              {
                label: "Delivery Date", name: "deliveryDate", type: "date", required: true, min: todayDate
              },
            ].map((field) => (
              <div className="input-wrapper" key={field.name}>
                <label className="form-label">
                  {field.label}
                  {field.required && <span className="required-asterisk">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="add-user-input"
                    name={field.name}
                    placeholder={field.label}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    className="add-user-input"
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.label}
                    value={
                      field.name === "deliveryDate"
                        ? form.deliveryDate?.slice(0, 10)
                        : form[field.name]
                    }
                    onChange={handleChange}
                    required={field.required}
                    min={field.min || undefined}
                  />
                )}
              </div>
            ))}

            <button type="submit" className="add-user"  disabled={userIsLoading}>
                {userIsLoading ? (
    <span className="spinner" />
  ) : (
    isEditMode ? "Update User" : "Add User"
  )}
            </button>
          </form>
        </div>
      )}

      {activeTab === "list" && (
        <div className="list-section fadeIn">
          <h3>📋 Users List</h3>
          {users.length === 0 ? (
            <p className="empty">No users added yet.</p>
          ) : (
            <div className="user-list">
              {users.map((user, index) => (
                <div
                  className="user-card slide-in"
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedUser({ ...user, index })}
                >
                  <h4>{user.name}</h4>
                  <p><FaEnvelope /> {user.email || "N/A"}</p>
                  <p><FaPhone /> {user.phone}</p>
                  <p><FaBoxOpen /> {user.productName}</p>
                  <p><FaDollarSign />{user.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedUser && (
        <div className="popup-overlay" onClick={() => setSelectedUser(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-inside" onClick={() => setSelectedUser(null)}>×</button>
            <h3>{selectedUser.name}</h3>
            <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Address:</strong> {selectedUser.address || "N/A"}</p>
            <p><strong>Comments:</strong> {selectedUser.comments || "None"}</p>
            <p><strong>Product:</strong> {selectedUser.productName}</p>
            <p><strong>Price:</strong>{selectedUser.price}</p>
            <p><strong><FaCalendarAlt /> Delivery Date:</strong> {selectedUser.deliveryDate?.slice(0, 10)}</p>

            <div className="popup-actions">
              <button className="edit-btn" onClick={() => handleEdit(selectedUser.index)}>
                <FaEdit /> Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(selectedUser.index)}   disabled={deletingIndex === selectedUser.index}>
                  {deletingIndex === selectedUser.index ? (
    <span className="spinner" />
  ) : (
    <>
      <FaTrash /> Delete
    </>
  )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasedUsers;
