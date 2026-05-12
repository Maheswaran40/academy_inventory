// backend/models/StaffDevice.js
const mongoose = require('mongoose');

const staffDeviceSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true
  },
  departmentRole: {
    type: String,
    trim: true,
    default: ''
  },
  laptop: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  mouse: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  systemDesktop: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  charger: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  remarks: {
    type: String,
    trim: true,
    default: ''
  },
  dateChecked: {
    type: Date,
    default: Date.now
  },
  checkedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StaffDevice', staffDeviceSchema);