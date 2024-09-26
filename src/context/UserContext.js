// UserContext.js
import React, { createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token = localStorage.getItem('jwtToken'); // Adjust as necessary
  let user = null;

  // Decode the JWT to extract user info
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
