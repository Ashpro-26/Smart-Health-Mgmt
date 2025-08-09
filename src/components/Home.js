import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const { user, loading, initialized } = useAuth();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [pendingRoute, setPendingRoute] = useState(null);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Only redirect to dashboard if we have a confirmed user
  if (initialized && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handler for fade-out and navigation
  const handleFadeAndNavigate = (route) => {
    setShowContent(false);
    setPendingRoute(route);
  };

  // When the exit animation is complete, navigate
  const handleExitComplete = () => {
    if (pendingRoute) {
      navigate(pendingRoute);
    }
  };

  // If we're initialized and there's no user, show the home page
  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {showContent && (
        <motion.div
          key="home-page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50"
        >
          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                    Smart Healthcare
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleFadeAndNavigate('/login')}
                    className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleFadeAndNavigate('/register')}
                    className="bg-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors duration-200 shadow-lg shadow-primary-600/20"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
              <div className="text-center space-y-12">
                {/* Hero Content */}
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                    Smart Healthcare
                    <span className="block text-primary-600 mt-2">Management System</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Transforming healthcare through technology. Experience seamless medical care management with our innovative platform.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <button
                    onClick={() => handleFadeAndNavigate('/register')}
                    className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-primary-700 transition-all duration-200 shadow-xl shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5"
                  >
                    Get Started Now
                  </button>
                  <Link
                    to="/about"
                    className="w-full sm:w-auto text-gray-600 hover:text-gray-900 px-8 py-4 rounded-full text-base font-medium inline-flex items-center justify-center group transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300"
                  >
                    Learn More
                    <svg 
                      className="ml-2 h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <div className="p-6 bg-white rounded-2xl shadow-lg shadow-gray-100/40 hover:shadow-xl transition-shadow duration-200">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h3>
                    <p className="text-gray-600">Securely store and access your medical history anytime, anywhere.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-lg shadow-gray-100/40 hover:shadow-xl transition-shadow duration-200">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Appointments</h3>
                    <p className="text-gray-600">Schedule and manage your medical appointments with ease.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-lg shadow-gray-100/40 hover:shadow-xl transition-shadow duration-200">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
                    <p className="text-gray-600">Your health data is protected with enterprise-grade security.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home; 