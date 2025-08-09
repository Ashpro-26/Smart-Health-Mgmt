import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && mounted) {
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          try {
            const userData = await authService.getCurrentUser();
            if (userData && mounted) {
              setUser(userData);
            } else if (mounted) {
              localStorage.removeItem('token');
              delete axios.defaults.headers.common['Authorization'];
            }
          } catch (err) {
            console.error('Failed to get current user:', err);
            if (mounted) {
              localStorage.removeItem('token');
              delete axios.defaults.headers.common['Authorization'];
            }
          }
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        if (mounted) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initAuth();
    return () => {
      mounted = false;
    };
  }, []);

  const validateCredentials = (credentials) => {
    if (!credentials?.email?.trim()) {
      throw new Error('Email is required');
    }
    if (!credentials?.password?.trim()) {
      throw new Error('Password is required');
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email.trim())) {
      throw new Error('Please enter a valid email address');
    }
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  };

  const login = async (credentials) => {
    try {
      validateCredentials(credentials);
      setLoading(true);
      setError(null);
      
      const response = await authService.login({
        email: credentials.email.trim(),
        password: credentials.password.trim()
      });
      
      if (response?.token) {
        localStorage.setItem('token', response.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        setUser(response.user);
        return response;
      } else {
        throw new Error('Authentication failed - no token received');
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      // Validate credentials before setting loading state
      validateCredentials(userData);
      console.log('Credentials validated');

      setLoading(true);
      setError(null);
      
      console.log('Calling authService.register with:', {
        name: userData.name,
        email: userData.email,
        role: userData.role
      });

      const response = await authService.register({
        ...userData,
        email: userData.email.trim(),
        password: userData.password.trim()
      });
      
      console.log('AuthService register response:', response);

      if (response?.user) {
        console.log('Registration successful');
        return response;
      } else {
        console.error('Invalid response from authService:', response);
        throw new Error('Registration failed - invalid response from server');
      }
    } catch (err) {
      console.error('Registration error in AuthContext:', err);
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err; // Throw the original error to preserve the error type
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.updateProfile(userData);
      if (response && response.user) {
        setUser(response.user);
        return response;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!email?.trim()) {
        throw new Error('Please provide an email address');
      }

      const response = await authService.resetPassword(email.trim());
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to send reset instructions';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyResetCode = async (email, code, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!email?.trim() || !code?.trim() || !newPassword?.trim()) {
        throw new Error('Please provide email, reset code, and new password');
      }

      const response = await authService.verifyResetCode(
        email.trim(),
        code.trim(),
        newPassword.trim()
      );
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    initialized,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
    verifyResetCode
  };

  if (loading && !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 