// frontend/src/components/Navbar.js
const Navbar = ({ setCurrentPage, currentPage }) => {
  return (
    <nav className="navbar">
      <h1>📋 Academy Inventory Checklist</h1>
      <div className="nav-links">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('dashboard'); }}
          style={{ fontWeight: currentPage === 'dashboard' ? 'bold' : 'normal' }}
        >
          📊 Dashboard
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('staff'); }}
          style={{ fontWeight: currentPage === 'staff' ? 'bold' : 'normal' }}
        >
          👥 Staff Devices
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('lab'); }}
          style={{ fontWeight: currentPage === 'lab' ? 'bold' : 'normal' }}
        >
          🏫 Lab Devices
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('record'); }}
          style={{ fontWeight: currentPage === 'record' ? 'bold' : 'normal' }}
        >
          🏫 record 
        </a>
         <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('missing'); }}
          style={{ fontWeight: currentPage === 'missing' ? 'bold' : 'normal' }}
        >
         missing list
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
