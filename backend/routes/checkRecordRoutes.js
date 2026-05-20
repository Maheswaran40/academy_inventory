const express = require('express');
const router = express.Router();
const {
  createCheckRecord,
  getAllCheckRecords,
  getCheckRecordsByDate,
  deleteCheckRecord,
  exportCheckRecordsExcel
} = require('../controllers/checkRecordController');

// Routes
router.get('/export-excel', exportCheckRecordsExcel);
router.post('/', createCheckRecord);
router.get('/', getAllCheckRecords);
router.get('/:date', getCheckRecordsByDate);
router.delete('/:id', deleteCheckRecord);

module.exports = router;