import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Change this when deploying

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic POST
const post = async (endpoint, data) => {
  try {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Request failed');
  }
};

// Generic GET
const get = async (endpoint) => {
  try {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Request failed');
  }
};

const put = async (endpoint, data) => {
  try {
    const response = await api.put(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} error:`, error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Request failed');
  }
};

const del = async (endpoint) => {
  try {
    const response = await api.delete(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} error:`, error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Request failed');
  }
};

const getAllPurchasedUsers = async () => get('purchased-users');
const addPurchasedUser = async (data) => post('purchased-users', data);
const updatePurchasedUser = async (id, data) => put(`purchased-users/${id}`, data);
const deletePurchasedUser = async (id) => del(`purchased-users/${id}`);

// Named method to get all contacts
const getAllContacts = async () => {
  return await get('contact/all');
};

// Add to your existing API file

// Post a new subscription (email or phone)
const postSubscription = async (data) => {
  return await post('subscribe', data); // Matches route: POST /api/subscribe
};

// Get all subscriptions
const getAllSubscriptions = async () => {
  return await get('subscribe/all'); // Matches route: GET /api/subscribe/all
};

const postUserData = async (data) => {
  return await post('user-data', data);  // POST /api/user-data
};

// Get all user data for admin view
const getAllUserData = async () => {
  return await get('user-data/getAllUserData');    // GET /api/user-data/all
};

export default {
  post,
  get,
  put,
  del,
  getAllContacts,
  postSubscription,
  getAllSubscriptions,
  postUserData,
  getAllUserData,
  getAllPurchasedUsers,
  addPurchasedUser,
  updatePurchasedUser,
  deletePurchasedUser,
};
