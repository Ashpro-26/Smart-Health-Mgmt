import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const prescriptionService = {
  async getUserPrescriptions() {
    try {
      console.log('Making API call to get user prescriptions');
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get(`${API_URL}/prescriptions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getUserPrescriptions:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to fetch prescriptions');
      }
      throw error;
    }
  },

  async createPrescription(prescriptionData) {
    try {
      console.log('Making API call to create prescription:', prescriptionData);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.post(`${API_URL}/prescriptions`, prescriptionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in createPrescription:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to create prescription');
      }
      throw error;
    }
  },

  async updatePrescription(id, prescriptionData) {
    try {
      console.log('Making API call to update prescription:', { id, prescriptionData });
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.put(`${API_URL}/prescriptions/${id}`, prescriptionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in updatePrescription:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to update prescription');
      }
      throw error;
    }
  },

  async deletePrescription(id) {
    try {
      console.log('Making API call to delete prescription:', id);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.delete(`${API_URL}/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in deletePrescription:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to delete prescription');
      }
      throw error;
    }
  }
};

export default prescriptionService; 