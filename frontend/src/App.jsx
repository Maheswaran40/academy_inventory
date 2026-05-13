// frontend/src/App.js
import React from 'react';
import InventoryProvider from './context/InventoryContext';
import { CheckRecordProvider } from './context/CheckRecordContext'; // Add this import
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StaffPage from './pages/StaffPage';
import LabPage from './pages/LabPage';
import CheckRecordsPage from './pages/CheckRecordsPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'staff':
        return <StaffPage />;
      case 'lab':
        return <LabPage />;
      case 'record':
        return <CheckRecordsPage/>;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <InventoryProvider>
      <CheckRecordProvider>  {/* Add this provider wrapper */}
        <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <div className="container">
          {renderPage()}
        </div>
      </CheckRecordProvider>
    </InventoryProvider>
  );
}

export default App;