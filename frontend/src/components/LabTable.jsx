// frontend/src/components/LabTable.js
import  { useContext, useState } from 'react';
import  InventoryProvider  from '../context/InventoryContext';

const LabTable = ({ onEdit }) => {
  const { labDevices, deleteLabDevice } = useContext(InventoryProvider);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredLabs = labDevices.filter(lab =>
    lab.labName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await deleteLabDevice(id);
    if (result.success) {
      setDeleteConfirm(null);
    } else {
      alert('Error deleting: ' + result.error);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by lab name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Lab Name</th>
              <th>Systems</th>
              <th>Mice</th>
              <th>Keyboards</th>
              <th>Laptops</th>
              <th>Chargers</th>
              <th>Date</th>
              <th>Checked By</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLabs.map(lab => (
              <tr key={lab._id}>
                <td>{lab.labName}</td>
                <td>{lab.numberOfSystems}</td>
                <td>{lab.numberOfMice}</td>
                <td>{lab.numberOfKeyboards}</td>
                <td>{lab.numberOfLaptops}</td>
                <td>{lab.numberOfChargers}</td>
                <td>{lab.dateChecked ? new Date(lab.dateChecked).toLocaleDateString() : '-'}</td>
                <td>{lab.checkedBy || '-'}</td>
                <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lab.remarks || '-'}</td>
                <td className="action-buttons">
                  <button onClick={() => onEdit(lab)} className="btn-edit">Edit</button>
                  <button onClick={() => setDeleteConfirm(lab._id)} className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
            {filteredLabs.length === 0 && (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>No lab records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', maxWidth: '400px', textAlign: 'center' }}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this record?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger">Delete</button>
              <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTable;