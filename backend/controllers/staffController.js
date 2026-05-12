// backend/controllers/staffController.js
const StaffDevice = require('../models/StaffDevice');

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