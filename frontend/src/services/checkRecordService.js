import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const checkRecordService = {
  // Create new check record
  createCheckRecord: async (recordData) => {
    try {
      const response = await axios.post(`${API_URL}/checkrecords`, recordData);
      console.log("response",response);
      
      return response.data;
    } catch (error) {
      console.error('Error creating check record:', error);
      throw error;
    }
  },

  // Get all check records
  getAllCheckRecords: async () => {
    try {
      const response = await axios.get(`${API_URL}/checkrecords`);
      return response.data;
    } catch (error) {
      console.error('Error fetching check records:', error);
      throw error;
    }
  },

  // Get check records by date
  getCheckRecordsByDate: async (date) => {
    try {
      const response = await axios.get(`${API_URL}/checkrecords/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching check records by date:', error);
      throw error;
    }
  },

  // Delete check record
  deleteCheckRecord: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/checkrecords/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting check record:', error);
      throw error;
    }
  }
};

export default checkRecordService;