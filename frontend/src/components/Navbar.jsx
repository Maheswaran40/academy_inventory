// frontend/src/components/Navbar.js
import logo from "../images/ilife.png"
const Navbar = ({ setCurrentPage, currentPage }) => {
  return (
    <nav className="navbar">
      <h1 style={{display:"flex",alignItems:"center"}}> <img src={logo} style={{borderRadius:"20px",marginRight:"20px"}} alt="" height="50px"/> Ilife Academy Inventory Checklist</h1>
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
          💾 record 
        </a>
         <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setCurrentPage('missing'); }}
          style={{ fontWeight: currentPage === 'missing' ? 'bold' : 'normal' }}
        >
        📝 missing list
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
