import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 border-primary-500' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/dashboard" className="text-xl font-semibold text-primary-600">
                  Smart Healthcare
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard"
                  className={`${isActive('/dashboard')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className={`${isActive('/appointments')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Appointments
                </Link>
                <Link
                  to="/medical-history"
                  className={`${isActive('/medical-history')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Medical History
                </Link>
                <Link
                  to="/prescriptions"
                  className={`${isActive('/prescriptions')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Prescriptions
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className={`${isActive('/profile')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow min-h-[calc(100vh-8rem)] p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Simple footer for authenticated pages */}
      <footer className="bg-gray-800 text-white py-4 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Smart Healthcare</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 