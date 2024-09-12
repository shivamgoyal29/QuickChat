import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance with authorization token if provided
const API = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: { Authorization: token },
    withCredentials: true,  // Ensure credentials (cookies, tokens) are sent
  });

let url = process.env.REACT_APP_SERVER_URL;

// Login API
export const loginUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/login`, body, {
      withCredentials: true,  // Send credentials with the request
    });
  } catch (error) {
    console.log('error in login user API');
  }
};

// Google OAuth API
export const googleAuth = async (body) => {
  try {
    return await axios.post(`${url}/api/google`, body, {
      withCredentials: true,  // Send credentials
    });
  } catch (error) {
    console.log('error in Google OAuth API');
  }
};

// Register User API
export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/auth/register`, body, {
      withCredentials: true,  // Send credentials
    });
  } catch (error) {
    console.log('error in register user API');
  }
};

// Validate User API
export const validUser = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
      withCredentials: true,  // Ensure credentials are sent
    });
    return data;
  } catch (error) {
    console.log('error in valid user API');
  }
};

// Search Users API
export const searchUsers = async (id) => {
  try {
    const token = localStorage.getItem('userToken');
    return await API(token).get(`/api/user?search=${id}`, {
      withCredentials: true,  // Send credentials
    });
  } catch (error) {
    console.log('error in search users API');
  }
};

// Update User API
export const updateUser = async (id, body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch(`/api/users/update/${id}`, body, {
      withCredentials: true,  // Send credentials
    });
    return data;
  } catch (error) {
    console.log('error in update user API');
    toast.error('Something Went Wrong. Try Again!');
  }
};

// Check if User is Valid and Redirect
export const checkValid = async () => {
  const data = await validUser();
  if (!data?.user) {
    window.location.href = '/login';
  } else {
    window.location.href = '/chats';
  }
};
