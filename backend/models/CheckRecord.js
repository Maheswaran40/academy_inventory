const mongoose = require('mongoose');

const checkRecordSchema = new mongoose.Schema({
  itemType: {
    type: String,
    enum: ['staff', 'lab'],
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'itemType'
  },
  itemName: {
    type: String,
    required: true
  },
  checkedBy: {
    type: String,
    required: true
  },
  checkedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  isWorking: {
    type: Boolean,
    default: false
  },
  isMissing: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient date queries
checkRecordSchema.index({ checkedDate: -1 });
checkRecordSchema.index({ itemType: 1, itemId: 1 });

module.exports = mongoose.model('CheckRecord', checkRecordSchema);