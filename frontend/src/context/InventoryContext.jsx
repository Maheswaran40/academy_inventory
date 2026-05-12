import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryContext from './useInventory';

const API_URL = 'http://localhost:5000/api';

function InventoryProvider({ children }) {
  const [staffDevices, setStaffDevices] = useState([]);
  const [labDevices, setLabDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch staff devices
  const fetchStaffDevices = async () => {
    try {
      const response = await axios.get(`${API_URL}/staff`);
      setStaffDevices(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching staff devices');
    }
  };

  // Fetch lab devices
  const fetchLabDevices = async () => {
    try {
      const response = await axios.get(`${API_URL}/lab`);
      setLabDevices(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching lab devices');
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchStaffDevices(), fetchLabDevices()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Staff CRUD
  const addStaffDevice = async (staffData) => {
    try {
      const response = await axios.post(`${API_URL}/staff`, staffData);
      setStaffDevices([response.data, ...staffDevices]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const updateStaffDevice = async (id, staffData) => {
    try {
      const response = await axios.put(`${API_URL}/staff/${id}`, staffData);
      setStaffDevices(
        staffDevices.map((item) => (item._id === id ? response.data : item))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const deleteStaffDevice = async (id) => {
    try {
      await axios.delete(`${API_URL}/staff/${id}`);
      setStaffDevices(staffDevices.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  // Lab CRUD
  const addLabDevice = async (labData) => {
    try {
      const response = await axios.post(`${API_URL}/lab`, labData);
      setLabDevices([response.data, ...labDevices]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const updateLabDevice = async (id, labData) => {
    try {
      const response = await axios.put(`${API_URL}/lab/${id}`, labData);
      setLabDevices(
        labDevices.map((item) => (item._id === id ? response.data : item))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const deleteLabDevice = async (id) => {
    try {
      await axios.delete(`${API_URL}/lab/${id}`);
      setLabDevices(labDevices.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const value = {
    staffDevices,
    labDevices,
    loading,
    error,
    addStaffDevice,
    updateStaffDevice,
    deleteStaffDevice,
    addLabDevice,
    updateLabDevice,
    deleteLabDevice,
    fetchStaffDevices,
    fetchLabDevices,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export default InventoryProvider;