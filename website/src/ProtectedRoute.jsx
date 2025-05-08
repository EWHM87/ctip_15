import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './auth';

function ProtectedRoute({ allowedRoles, children }) {
  const isLoggedIn = AuthService.isLoggedIn();
  const userRole = AuthService.getRole();

  // Not logged in → redirect to login
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // Role not allowed → forbidden
  if (!allowedRoles.includes(userRole)) return <Navigate to="/forbidden" replace />;

  // Authorized → show child component
  return children;
}

export default ProtectedRoute;
