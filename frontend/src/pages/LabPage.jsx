// frontend/src/pages/LabPage.js
import  { useState } from 'react';
import LabForm from '../components/LabForm';
import LabTable from '../components/LabTable';

const LabPage = () => {
  const [editingLab, setEditingLab] = useState(null);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>🏫 Lab Devices Management</h2>
      <LabForm editingItem={editingLab} onCancelEdit={() => setEditingLab(null)} />
      <LabTable onEdit={(lab) => setEditingLab(lab)} />
    </div>
  );
};

export default LabPage;