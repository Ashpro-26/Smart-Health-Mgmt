import axios from 'axios';

// Define base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

class AuthService {
  // Check if server is available
  async checkServer() {
    try {
      const response = await axios.get('/api/health');
      return response.data === 'OK';
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  }

  // Register new user
  async register(userData) {
    try {
      console.log('Making registration API call with:', {
        name: userData.name,
        email: userData.email,
        role: userData.role
      });

      const response = await axios.post('/api/auth/register', {
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
        role: userData.role || 'patient'
      });
      
      console.log('Registration API response:', response.data);

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        // Set the token in axios defaults for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        const returnData = {
          token: response.data.token,
          user: response.data.user || {
            name: userData.name,
            email: userData.email,
            role: userData.role
          }
        };
        
        console.log('Returning registration data:', returnData);
        return returnData;
      } else {
        console.error('No token in response:', response.data);
        throw new Error('Registration failed - no token received');
      }
    } catch (error) {
      console.error('Registration API error:', error.response || error);
      if (error.response) {
        // Server responded with an error
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'Registration failed';
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to reach the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  }

  // Login user
  async login(credentials) {
    try {
      // Basic validation
      if (!credentials?.email?.trim() || !credentials?.password?.trim()) {
        throw new Error('Please provide both email and password');
      }

      const response = await axios.post('/api/auth/login', {
        email: credentials.email.trim(),
        password: credentials.password.trim()
      });
      
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
      } else {
        throw new Error('Invalid response from server - no token received');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'Invalid credentials';
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to reach the server. Please check your internet connection.');
      } else {
        // Error was thrown before making the request (like validation)
        throw error;
      }
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      // Make API call to validate token and get user data
      const response = await axios.get('/api/auth/profile');
      return response.data?.user || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      localStorage.removeItem('token');
      return null;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      return await axios.put('/api/auth/profile', userData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      return await axios.put('/api/auth/change-password', passwordData);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      console.log('Sending password reset request for:', email);
      
      const response = await axios.post('/api/auth/reset-password', { 
        email: email.trim() 
      });
      
      console.log('Reset password response:', response.data);
      
      if (response.data?.success) {
        return response.data;
      } else {
        throw new Error('Failed to send reset instructions');
      }
    } catch (error) {
      console.error('Reset password error:', error.response || error);
      if (error.response) {
        // Server responded with an error
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'Failed to send reset instructions';
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to reach the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  }

  // Verify reset code and set new password
  async verifyResetCode(email, code, newPassword) {
    try {
      console.log('Verifying reset code for:', email);
      
      const response = await axios.post('/api/auth/verify-reset-code', {
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword.trim()
      });
      
      console.log('Verify reset code response:', response.data);
      
      if (response.data?.success) {
        return response.data;
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      console.error('Verify reset code error:', error.response || error);
      if (error.response) {
        // Server responded with an error
        const message = error.response.data?.message || 
                       error.response.data?.error || 
                       'Failed to reset password';
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Unable to reach the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(error.message || 'An unexpected error occurred');
      }
    }
  }

  // Get current auth token
  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = this.getCurrentUser();
      if (!decoded) return false;

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService(); 