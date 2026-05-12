// frontend/src/App.js
import React from 'react';
import  InventoryProvider  from './context/InventoryContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StaffPage from './pages/StaffPage';
import LabPage from './pages/LabPage';

function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'staff':
        return <StaffPage />;
      case 'lab':
        return <LabPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <InventoryProvider>
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="container">
        {renderPage()}
      </div>
    </InventoryProvider>
  );
}

export default App;