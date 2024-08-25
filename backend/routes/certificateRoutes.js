const express = require('express');
const { getCertificate, downloadCertificate } = require('../controllers/certificateController');
const router = express.Router();

router.get('/:id', getCertificate);
router.get('/:id/download', downloadCertificate);

module.exports = router;
