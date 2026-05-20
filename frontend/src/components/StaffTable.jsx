// frontend/src/components/StaffTable.js
import { useContext, useState } from "react";
import InventoryContext from "../context/useInventory";

const StaffTable = ({ onEdit }) => {
  const { staffDevices, deleteStaffDevice } = useContext(InventoryContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredStaff = staffDevices.filter(
    (staff) =>
      staff.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.departmentRole?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // excel get
const downloadExcel = () => {
  window.open(import.meta.env.VITE_EXCEL_STAFF_API);
};


  const handleDelete = async (id) => {
    const result = await deleteStaffDevice(id);
    if (result.success) {
      setDeleteConfirm(null);
    } else {
      alert("Error deleting: " + result.error);
    }
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by staff name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Department</th>
              <th>Laptop</th>
              <th>Mouse</th>
              <th>Desktop</th>
              <th>Charger</th>
              <th>Date</th>
              <th>Checked By</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.staffName}</td>
                <td>{staff.departmentRole || "-"}</td>
                <td>{staff.laptop === "Yes" ? "✅" : "❌"}</td>
                <td>{staff.mouse === "Yes" ? "✅" : "❌"}</td>
                <td>{staff.systemDesktop === "Yes" ? "✅" : "❌"}</td>
                <td>{staff.charger === "Yes" ? "✅" : "❌"}</td>
                <td>
                  {staff.dateChecked
                    ? new Date(staff.dateChecked).toLocaleDateString()
                    : "-"}
                </td>
                <td>{staff.checkedBy || "-"}</td>
                <td
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {staff.remarks || "-"}
                </td>
                <td className="action-buttons">
                  <button onClick={() => onEdit(staff)} className="btn-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(staff._id)}
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No staff records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this record?</p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn-danger"
              >
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTable;
