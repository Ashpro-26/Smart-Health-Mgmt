import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showContent, setShowContent] = useState(true);
  const [pendingRoute, setPendingRoute] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: formData.email.trim(),
        password: formData.password.trim()
      });

      if (result?.token) {
        setShowContent(false);
        setPendingRoute('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      const errorMessage = err.message.toLowerCase();
      if (errorMessage.includes('email')) {
        setErrors({ email: err.message });
      } else if (errorMessage.includes('password')) {
        setErrors({ password: err.message });
      } else {
        setErrors({ submit: err.message });
      }
    }
  };

  const validateForm = () => {
    // Basic client-side validation
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!formData.password.trim()) {
      setErrors({ password: 'Password is required' });
      return false;
    }
    return true;
  };

  const handleExitComplete = () => {
    if (pendingRoute) {
      navigate(pendingRoute, { replace: true });
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {showContent && (
        <motion.div
          key="login-page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  create a new account
                </Link>
              </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.submit && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="text-sm text-red-700">{errors.submit}</div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`block w-full appearance-none rounded-md border ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`block w-full appearance-none rounded-md border ${
                          errors.password ? 'border-red-300' : 'border-gray-300'
                        } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading 
                          ? 'bg-primary-400 cursor-not-allowed' 
                          : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                      }`}
                    >
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login; 