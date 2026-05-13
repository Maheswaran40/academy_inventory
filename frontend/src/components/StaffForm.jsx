// frontend/src/components/StaffForm.js
import { useContext, useState } from 'react';
import InventoryContext from '../context/useInventory';

const StaffForm = ({ editingItem, onCancelEdit }) => {
  const { addStaffDevice, updateStaffDevice } = useContext(InventoryContext);
  const [formData, setFormData] = useState({
    staffName: editingItem?.staffName || '',
    departmentRole: editingItem?.departmentRole || '',
    laptop: editingItem?.laptop || 'No',
    mouse: editingItem?.mouse || 'No',
    systemDesktop: editingItem?.systemDesktop || 'No',
    charger: editingItem?.charger || 'No',
    remarks: editingItem?.remarks || '',
    dateChecked: editingItem?.dateChecked || new Date().toISOString().split('T')[0],
    checkedBy: editingItem?.checkedBy || 'Admin'
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (editingItem) {
      result = await updateStaffDevice(editingItem._id, formData);
    } else {
      result = await addStaffDevice(formData);
    }
    
    if (result.success) {
      setMessage({ text: editingItem ? 'Staff updated successfully!' : 'Staff added successfully!', type: 'success' });
      if (!editingItem) {
        setFormData({
          staffName: '',
          departmentRole: '',
          laptop: 'No',
          mouse: 'No',
          systemDesktop: 'No',
          charger: 'No',
          remarks: '',
          dateChecked: new Date().toISOString().split('T')[0],
          checkedBy: 'Admin'
        });
      } else {
        onCancelEdit();
      }
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: result.error || 'Error saving staff', type: 'error' });
    }
  };

  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Edit Staff Device' : '➕ Add Staff Device'}</h2>
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '6px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Staff Name *</label>
            <input type="text" name="staffName" value={formData.staffName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department / Role</label>
            <input type="text" name="departmentRole" value={formData.departmentRole} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group checkbox-group">
            <input type="checkbox" name="laptop" checked={formData.laptop === 'Yes'} onChange={handleChange} />
            <label>Laptop</label>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" name="mouse" checked={formData.mouse === 'Yes'} onChange={handleChange} />
            <label>Mouse</label>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" name="systemDesktop" checked={formData.systemDesktop === 'Yes'} onChange={handleChange} />
            <label>System/Desktop</label>
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" name="charger" checked={formData.charger === 'Yes'} onChange={handleChange} />
            <label>Charger</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date Checked</label>
            <input type="date" name="dateChecked" value={formData.dateChecked} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Checked By</label>
            <input type="text" name="checkedBy" value={formData.checkedBy} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit">{editingItem ? 'Update' : 'Save'}</button>
          {editingItem && <button type="button" onClick={onCancelEdit} className="btn-danger">Cancel</button>}
        </div>
      </form>
    </div>
  );
};

export default StaffForm;