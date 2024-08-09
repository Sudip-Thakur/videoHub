// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants.js';
const AuthContext = createContext();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // This ensures cookies are sent with requests
});
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/current-user`);
      if (response.data.success) {
        setUser(response.data.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
