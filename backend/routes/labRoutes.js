// backend/routes/labRoutes.js
const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');

// Routes for lab devices
router.get('/', labController.getAllLabs);
router.get('/:id', labController.getLabById);
router.post('/', labController.createLab);
router.put('/:id', labController.updateLab);
router.delete('/:id', labController.deleteLab);

module.exports = router;