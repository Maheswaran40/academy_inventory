// frontend/src/components/LabForm.js
import { useContext, useState } from 'react';
import InventoryContext from '../context/useInventory';

const LabForm = ({ editingItem, onCancelEdit }) => {
  const { addLabDevice, updateLabDevice } = useContext(InventoryContext);
  const [formData, setFormData] = useState({
    labName: editingItem?.labName || '',
    numberOfSystems: editingItem?.numberOfSystems || 0,
    numberOfMice: editingItem?.numberOfMice || 0,
    numberOfKeyboards: editingItem?.numberOfKeyboards || 0,
    numberOfLaptops: editingItem?.numberOfLaptops || 0,
    numberOfChargers: editingItem?.numberOfChargers || 0,
    remarks: editingItem?.remarks || '',
    dateChecked: editingItem?.dateChecked || new Date().toISOString().split('T')[0],
    checkedBy: editingItem?.checkedBy || 'Admin'
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('number') ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (editingItem) {
      result = await updateLabDevice(editingItem._id, formData);
    } else {
      result = await addLabDevice(formData);
    }
    
    if (result.success) {
      setMessage({ text: editingItem ? 'Lab updated successfully!' : 'Lab added successfully!', type: 'success' });
      if (!editingItem) {
        setFormData({
          labName: '',
          numberOfSystems: 0,
          numberOfMice: 0,
          numberOfKeyboards: 0,
          numberOfLaptops: 0,
          numberOfChargers: 0,
          remarks: '',
          dateChecked: new Date().toISOString().split('T')[0],
          checkedBy: 'Admin'
        });
      } else {
        onCancelEdit();
      }
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } else {
      setMessage({ text: result.error || 'Error saving lab', type: 'error' });
    }
  };

  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Edit Lab Device' : '➕ Add Lab Device'}</h2>
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '6px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Lab Name / Number *</label>
            <input type="text" name="labName" value={formData.labName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Number of Systems</label>
            <input type="number" name="numberOfSystems" value={formData.numberOfSystems} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Number of Mice</label>
            <input type="number" name="numberOfMice" value={formData.numberOfMice} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Number of Keyboards</label>
            <input type="number" name="numberOfKeyboards" value={formData.numberOfKeyboards} onChange={handleChange} min="0" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Number of Laptops</label>
            <input type="number" name="numberOfLaptops" value={formData.numberOfLaptops} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Number of Chargers</label>
            <input type="number" name="numberOfChargers" value={formData.numberOfChargers} onChange={handleChange} min="0" />
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

export default LabForm;