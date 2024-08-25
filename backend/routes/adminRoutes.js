// routes/adminRoutes.js
const express = require('express');
const { upload, uploadExcel } = require('../controllers/adminController');
const validateCertificate = require('../middleware/validateCertificate');
const router = express.Router();

router.post('/upload', upload.single('file'), validateCertificate, uploadExcel);

module.exports = router;
