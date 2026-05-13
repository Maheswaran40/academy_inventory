import React, { createContext, useState, useContext, useEffect } from 'react';
import checkRecordService from '../services/checkRecordService';

const CheckRecordContext = createContext();

export const useCheckRecord = () => {
  const context = useContext(CheckRecordContext);
  if (!context) {
    throw new Error('useCheckRecord must be used within CheckRecordProvider');
  }
  return context;
};

export const CheckRecordProvider = ({ children }) => {
  const [checkRecords, setCheckRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all check records
  const loadCheckRecords = async () => {
    setLoading(true);
    try {
      const response = await checkRecordService.getAllCheckRecords();
      setCheckRecords(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading check records:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load check records by date
  const loadCheckRecordsByDate = async (date) => {
    setLoading(true);
    try {
      const response = await checkRecordService.getCheckRecordsByDate(date);
      setCheckRecords(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error loading check records by date:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Add new check record
  const addCheckRecord = async (recordData) => {
    setLoading(true);
    try {
      const response = await checkRecordService.createCheckRecord(recordData);
      setCheckRecords(prev => [response.data, ...prev]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error adding check record:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete check record
  const deleteCheckRecord = async (id) => {
    setLoading(true);
    try {
      await checkRecordService.deleteCheckRecord(id);
      setCheckRecords(prev => prev.filter(record => record._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting check record:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add multiple check records at once
  const addMultipleCheckRecords = async (recordsData) => {
    setLoading(true);
    try {
      const promises = recordsData.map(record => 
        checkRecordService.createCheckRecord(record)
      );
      const responses = await Promise.all(promises);
      const newRecords = responses.map(res => res.data);
      setCheckRecords(prev => [...newRecords, ...prev]);
      setError(null);
      return newRecords;
    } catch (err) {
      setError(err.message);
      console.error('Error adding multiple check records:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCheckRecords();
  }, []);

  const value = {
    checkRecords,
    loading,
    error,
    loadCheckRecords,
    loadCheckRecordsByDate,
    addCheckRecord,
    addMultipleCheckRecords,
    deleteCheckRecord
  };

  return (
    <CheckRecordContext.Provider value={value}>
      {children}
    </CheckRecordContext.Provider>
  );
};