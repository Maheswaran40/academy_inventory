// frontend/src/App.js
import React from 'react';
import InventoryProvider from './context/InventoryContext';
import { MissingReportProvider } from './context/MissingReportContext';
import { CheckRecordProvider } from './context/CheckRecordContext'; // Add this import
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StaffPage from './pages/StaffPage';
import MissingReportPage from './pages/MissingReportPage';
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
        case 'missing' :
          return  <MissingReportPage/>;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <InventoryProvider>
      <CheckRecordProvider>  {/* Add this provider wrapper */}
        <MissingReportProvider>
        <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <div className="container">
          {renderPage()}
        </div>
        </MissingReportProvider>
      </CheckRecordProvider>
    </InventoryProvider>
  );
}

export default App;