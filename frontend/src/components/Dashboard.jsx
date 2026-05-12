// frontend/src/components/Dashboard.js
// import { useContext } from "react";
import InventoryProvider from "../context/InventoryContext";

const Dashboard = () => {
  const { staffDevices, labDevices } = InventoryProvider;

  // Calculate totals
  const totalStaff = staffDevices;
  
  const totalLabs = labDevices.length;

  const totalStaffLaptops = staffDevices.filter(
    (s) => s.laptop === "Yes",
  ).length;
  const totalStaffDesktops = staffDevices.filter(
    (s) => s.systemDesktop === "Yes",
  ).length;

  let totalLabSystems = 0;
  let totalLabLaptops = 0;
  let totalLabMice = 0;
  let totalLabKeyboards = 0;
  let totalLabChargers = 0;

  labDevices.forEach((lab) => {
    totalLabSystems += lab.numberOfSystems || 0;
    totalLabLaptops += lab.numberOfLaptops || 0;
    totalLabMice += lab.numberOfMice || 0;
    totalLabKeyboards += lab.numberOfKeyboards || 0;
    totalLabChargers += lab.numberOfChargers || 0;
  });

  return (
    <div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>👥 Staff Members</h3>
          <div className="number">{totalStaff}</div>
        </div>
        <div className="stat-card">
          <h3>💻 Staff Laptops</h3>
          <div className="number">{totalStaffLaptops}</div>
        </div>
        <div className="stat-card">
          <h3>🖥️ Staff Desktops</h3>
          <div className="number">{totalStaffDesktops}</div>
        </div>
        <div className="stat-card">
          <h3>🏫 Labs</h3>
          <div className="number">{totalLabs}</div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>🖥️ Lab Systems</h3>
          <div className="number">{totalLabSystems}</div>
        </div>
        <div className="stat-card">
          <h3>💻 Lab Laptops</h3>
          <div className="number">{totalLabLaptops}</div>
        </div>
        <div className="stat-card">
          <h3>🖱️ Lab Mice</h3>
          <div className="number">{totalLabMice}</div>
        </div>
        <div className="stat-card">
          <h3>⌨️ Lab Keyboards</h3>
          <div className="number">{totalLabKeyboards}</div>
        </div>
        <div className="stat-card">
          <h3>🔌 Lab Chargers</h3>
          <div className="number">{totalLabChargers}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
