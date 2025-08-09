import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, initialized } = useAuth();
  const location = useLocation();

  // Only show loading state if we're still initializing
  if (loading && !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If we're done loading and there's no user, redirect to login
  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If we have a user or we're still loading but initialized, render the children
  return children;
};

export default ProtectedRoute; 