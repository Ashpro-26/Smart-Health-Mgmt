import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Cannot connect to server - please ensure the server is running'));
    }
    
    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        // Handle forbidden access
        window.location.href = '/unauthorized';
        break;
      default:
        break;
    }
    
    return Promise.reject(error);
  }
);

// Test connection function
api.testConnection = async () => {
  try {
    await api.get('/api/health');
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

export default api; 