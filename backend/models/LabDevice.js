// backend/models/LabDevice.js
const mongoose = require('mongoose');

const labDeviceSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: [true, 'Lab name is required'],
    trim: true
  },
  numberOfSystems: {
    type: Number,
    default: 0,
    min: 0
  },
  numberOfMice: {
    type: Number,
    default: 0,
    min: 0
  },
  numberOfKeyboards: {
    type: Number,
    default: 0,
    min: 0
  },
  numberOfLaptops: {
    type: Number,
    default: 0,
    min: 0
  },
  numberOfChargers: {
    type: Number,
    default: 0,
    min: 0
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

module.exports = mongoose.model('LabDevice', labDeviceSchema);