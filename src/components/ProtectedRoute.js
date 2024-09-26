import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if user is authenticated
  const isAuthenticated = token !== null; // Token present means authenticated

  if (isAuthenticated) {
    // If authenticated, redirect to homepage or profile page
    return <Navigate to="/profile" replace />;
  }

  // If not authenticated, allow access to the route (e.g., login or register)
  return children;
};

export default ProtectedRoute;
