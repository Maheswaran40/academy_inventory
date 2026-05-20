import axios from 'axios';

const API_URL =  import.meta.env.VITE_API_URL;

const missingReportService = {
  // Get all missing items
  getMissingItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/missing`);
      return response.data;
    } catch (error) {
      console.error('Error fetching missing items:', error);
      throw error;
    }
  },

  // Get missing items summary
  getMissingItemsSummary: async () => {
    try {
      const response = await axios.get(`${API_URL}/missing/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching missing items summary:', error);
      throw error;
    }
  },

  // Get missing items by date range
  getMissingItemsByDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/missing/date-range`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching missing items by date:', error);
      throw error;
    }
  }
};

export default missingReportService;