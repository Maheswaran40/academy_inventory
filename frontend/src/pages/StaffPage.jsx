// frontend/src/pages/StaffPage.js
import { useState } from 'react';
import StaffForm from '../components/StaffForm';
import StaffTable from '../components/StaffTable';

const StaffPage = () => {
  const [editingStaff, setEditingStaff] = useState(null);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>👥 Staff Devices Management</h2>
      <StaffForm editingItem={editingStaff} onCancelEdit={() => setEditingStaff(null)} />
      <StaffTable onEdit={(staff) => setEditingStaff(staff)} />
    </div>
  );
};

export default StaffPage;