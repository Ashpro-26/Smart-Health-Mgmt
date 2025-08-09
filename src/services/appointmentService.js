import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const appointmentService = {
  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
        withCredentials: true
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create appointment');
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error while creating appointment');
    }
  },

  // Get all appointments for the current user
  getAppointments: async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error while fetching appointments');
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (appointmentId, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/appointments/${appointmentId}/status`,
        { status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error while updating appointment status');
    }
  }
};

export default appointmentService; 