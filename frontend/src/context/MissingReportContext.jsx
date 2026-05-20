import React, { createContext, useState, useContext } from 'react';
import missingReportService from '../services/missingReportService';

const MissingReportContext = createContext();

export const useMissingReport = () => {
  const context = useContext(MissingReportContext);

  if (!context) {
    throw new Error('useMissingReport must be used within MissingReportProvider');
  }

  return context;
};

export const MissingReportProvider = ({ children }) => {
  const [missingItems, setMissingItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMissingItems = async () => {
    setLoading(true);
    try {
      const response = await missingReportService.getMissingItems();
      setMissingItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    setLoading(true);
    try {
      const response = await missingReportService.getMissingItemsSummary();
      setSummary(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMissingItemsByDateRange = async (startDate, endDate) => {
    setLoading(true);
    try {
      const response = await missingReportService.getMissingItemsByDateRange(startDate, endDate);
      setMissingItems(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <MissingReportContext.Provider
      value={{
        missingItems,
        summary,
        loading,
        error,
        loadMissingItems,
        loadSummary,
        loadMissingItemsByDateRange
      }}
    >
      {children}
    </MissingReportContext.Provider>
  );
};