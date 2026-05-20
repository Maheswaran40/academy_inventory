// backend/controllers/staffController.js
const StaffDevice = require('../models/StaffDevice');
const ExcelJS = require('exceljs');
// Get all staff devices
exports.getAllStaff = async (req, res) => {
  try {
    const staffDevices = await StaffDevice.find().sort({ createdAt: -1 });
    res.status(200).json(staffDevices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single staff device
exports.getStaffById = async (req, res) => {
  try {
    const staffDevice = await StaffDevice.findById(req.params.id);
    if (!staffDevice) {
      return res.status(404).json({ message: 'Staff device not found' });
    }
    res.status(200).json(staffDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create staff device
exports.createStaff = async (req, res) => {
  try {
    const staffDevice = new StaffDevice(req.body);
    const savedStaff = await staffDevice.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update staff device
exports.updateStaff = async (req, res) => {
  try {
    const updatedStaff = await StaffDevice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff device not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete staff device
exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await StaffDevice.findByIdAndDelete(req.params.id);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff device not found' });
    }
    res.status(200).json({ message: 'Staff device deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.exportStaffExcel = async (req, res) => {
  try {
    const records = await StaffDevice.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.columns = [
      { header: 'Staff Name', key: 'staffName', width: 20 },
      { header: 'Department Role', key: 'departmentRole', width: 20 },
      { header: 'Laptop', key: 'laptop', width: 15 },
      { header: 'Mouse', key: 'mouse', width: 15 },
      { header: 'Desktop', key: 'systemDesktop', width: 15 },
      { header: 'Charger', key: 'charger', width: 15 },
      { header: 'Remarks', key: 'remarks', width: 20 },
    ];

    records.forEach(record => {
      worksheet.addRow(record.toObject());
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=inventory.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};