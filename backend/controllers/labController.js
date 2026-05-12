// backend/controllers/labController.js
const LabDevice = require('../models/LabDevice');

// Get all lab devices
exports.getAllLabs = async (req, res) => {
  try {
    const labDevices = await LabDevice.find().sort({ createdAt: -1 });
    res.status(200).json(labDevices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single lab device
exports.getLabById = async (req, res) => {
  try {
    const labDevice = await LabDevice.findById(req.params.id);
    if (!labDevice) {
      return res.status(404).json({ message: 'Lab device not found' });
    }
    res.status(200).json(labDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create lab device
exports.createLab = async (req, res) => {
  try {
    const labDevice = new LabDevice(req.body);
    const savedLab = await labDevice.save();
    res.status(201).json(savedLab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update lab device
exports.updateLab = async (req, res) => {
  try {
    const updatedLab = await LabDevice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLab) {
      return res.status(404).json({ message: 'Lab device not found' });
    }
    res.status(200).json(updatedLab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete lab device
exports.deleteLab = async (req, res) => {
  try {
    const deletedLab = await LabDevice.findByIdAndDelete(req.params.id);
    if (!deletedLab) {
      return res.status(404).json({ message: 'Lab device not found' });
    }
    res.status(200).json({ message: 'Lab device deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};