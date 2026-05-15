const express = require('express');
const router = express.Router();
const {
  getMissingItems,
  getMissingItemsByDateRange,
  getMissingItemsSummary
} = require('../controllers/missingReportController');

// Routes
router.get('/', getMissingItems);
router.get('/summary', getMissingItemsSummary);
router.get('/date-range', getMissingItemsByDateRange);

module.exports = router;