import React, { useState, useEffect } from "react";
import { useCheckRecord } from "../context/CheckRecordContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CheckRecordsPage = () => {
  const {
    checkRecords,
    loading,
    deleteCheckRecord,
    addMultipleCheckRecords,
    loadCheckRecordsByDate,
    loadCheckRecords,
  } = useCheckRecord();

  const [staffDevices, setStaffDevices] = useState([]);
  const [labDevices, setLabDevices] = useState([]);
  const [checkData, setCheckData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch existing devices
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const [staffRes, labRes] = await Promise.all([
        axios.get(`${API_URL}/staff`),
        axios.get(`${API_URL}/lab`),
      ]);
      setStaffDevices(staffRes.data);
      setLabDevices(labRes.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  // Initialize check data for all devices
  const initializeCheckData = () => {
    const allDevices = [
      ...staffDevices.map((d) => ({ ...d, type: "staff" })),
      ...labDevices.map((d) => ({ ...d, type: "lab" })),
    ];

    const initialData = {};
    allDevices.forEach((device) => {
      initialData[device._id] = {
        isChecked: false,
        isWorking: false,
        isMissing: false,
        remarks: "",
      };
    });
    setCheckData(initialData);
  };

  useEffect(() => {
    if (staffDevices.length > 0 || labDevices.length > 0) {
      initializeCheckData();
    }
  }, [staffDevices, labDevices]);

  const handleCheckChange = (deviceId, field, value) => {
    setCheckData((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        [field]: value,
      },
    }));
  };

  const handleSaveAll = async () => {
    if (!checkedBy.trim()) {
      alert("Please enter your name");
      return;
    }

    setSaving(true);
    const allDevices = [
      ...staffDevices.map((d) => ({ ...d, type: "staff" })),
      ...labDevices.map((d) => ({ ...d, type: "lab" })),
    ];

    const recordsToSave = [];

    for (const device of allDevices) {
      const check = checkData[device._id];
      if (check && check.isChecked) {
        recordsToSave.push({
          itemType: device.type,
          itemId: device._id,
          itemName: device.staffName || device.labName,
          checkedBy: checkedBy,
          checkedDate: new Date(),
          isChecked: check.isChecked,
          isWorking: check.isWorking,
          isMissing: check.isMissing,
          remarks: check.remarks,
        });
      }
    }

    if (recordsToSave.length === 0) {
      alert("Please check at least one device");
      setSaving(false);
      return;
    }

    try {
      await addMultipleCheckRecords(recordsToSave);
      alert(`Successfully saved ${recordsToSave.length} check records`);
      initializeCheckData();
      setCheckedBy("");
    } catch (error) {
      console.error("Error saving check records:", error);
      alert("Error saving check records");
    } finally {
      setSaving(false);
    }
  };

  const handleDateFilter = async () => {
    if (selectedDate) {
      await loadCheckRecordsByDate(selectedDate);
    } else {
      await loadCheckRecords();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteCheckRecord(id);
        alert("Record deleted successfully");
      } catch (error) {
        alert("Error deleting record");
      }
    }
  };

  const allDevices = [
    ...staffDevices.map((d) => ({
      ...d,
      type: "staff",
      typeLabel: "Staff Device",
    })),
    ...labDevices.map((d) => ({ ...d, type: "lab", typeLabel: "Lab Device" })),
  ];
  const downloadCheckExcel = () => {
    window.open(import.meta.env.VITE_EXCEL_RECORD_API);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Weekly Device Check</h1>
      
      {/* Check Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {/* <h2 className="text-2xl font-semibold mb-4">New Weekly Check</h2> */}
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Checked By:
          </label>
          <form className="input-group w-50 bg-red-100">
            <input
              type="text"
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
              placeholder="Enter your name"
              required
              className="rounded-full"
              style={{ width: "200px", height: "30px" }}
            />
          </form>
        </div>
        <br />
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Device Details</th>
                <th className="py-2 px-4 border-b">Checked</th>
                <th className="py-2 px-4 border-b">Working</th>
                <th className="py-2 px-4 border-b">Missing</th>
                <th className="py-2 px-4 border-b">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device) => (
                <tr key={device._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {device.staffName || device.labName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {device.departmentRole}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* {device.model || device.deviceModel || '-'} */}
                    {device.type === "staff"
                      ? [
                          device.laptop === "Yes" && "Laptop",
                          device.mouse === "Yes" && "Mouse",
                          device.systemDesktop === "Yes" && "System",
                          device.charger === "Yes" && "Charger",
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : `Systems: ${device.numberOfSystems}, Mice: ${device.numberOfMice}, Laptops: ${device.numberOfLaptops}, Chargers: ${device.numberOfChargers}`}{" "}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={checkData[device._id]?.isChecked || false}
                      onChange={(e) =>
                        handleCheckChange(
                          device._id,
                          "isChecked",
                          e.target.checked,
                        )
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={checkData[device._id]?.isWorking || false}
                      onChange={(e) =>
                        handleCheckChange(
                          device._id,
                          "isWorking",
                          e.target.checked,
                        )
                      }
                      className="form-checkbox h-5 w-5 text-green-600"
                      disabled={!checkData[device._id]?.isChecked}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      checked={checkData[device._id]?.isMissing || false}
                      onChange={(e) =>
                        handleCheckChange(
                          device._id,
                          "isMissing",
                          e.target.checked,
                        )
                      }
                      className="form-checkbox h-5 w-5 text-red-600"
                      disabled={!checkData[device._id]?.isChecked}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={checkData[device._id]?.remarks || ""}
                      onChange={(e) =>
                        handleCheckChange(device._id, "remarks", e.target.value)
                      }
                      className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Remarks"
                      disabled={!checkData[device._id]?.isChecked}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Checked Items"}
          </button>
        </div>
      </div>
      <br />
      <br />
      {/* History Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Check History</h2>
        

        {/* Date Filter */}
        <div className="mb-4 flex gap-8">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={handleDateFilter}
            style={{margin:"0 10px"}}
            className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            
            Filter by Date
          </button>
          <button
            onClick={() => {
              setSelectedDate("");
              loadCheckRecords();
            }}
            style={{margin:"0 10px"}}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Show All
          </button>
          <button onClick={downloadCheckExcel} style={{margin:"0 10px"}}>Download Check Records</button>
        </div>

        {/* History Table */}
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Checked By</th>
                  <th className="py-2 px-4 border-b">Checked</th>
                  <th className="py-2 px-4 border-b">Working</th>
                  <th className="py-2 px-4 border-b">Missing</th>
                  <th className="py-2 px-4 border-b">Remarks</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {checkRecords.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No check records found
                    </td>
                  </tr>
                ) : (
                  checkRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        {new Date(record.checkedDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">{record.itemName}</td>
                      <td className="py-2 px-4 border-b">
                        {record.itemType === "staff"
                          ? "Staff Device"
                          : "Lab Device"}
                      </td>
                      <td className="py-2 px-4 border-b">{record.checkedBy}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {record.isChecked ? "✓" : "✗"}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {record.isWorking ? "✓" : "✗"}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {record.isMissing ? "✓" : "✗"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {record.remarks || "-"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDelete(record._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckRecordsPage;
