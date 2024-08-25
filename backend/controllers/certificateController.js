const PDFDocument = require('pdfkit');
const Certificate = require('../models/Certificate');

const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateID: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve certificate' });
  }
};

const downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateID: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${req.params.id}.pdf`,
      }).end(pdfData);
    });

    doc.text(`Certificate ID: ${certificate.certificateID}`, 50, 50);
    doc.text(`Name: ${certificate.studentName}`, 50, 70);
    doc.text(`Internship Domain: ${certificate.internshipDomain}`, 50, 90);
    doc.text(`Start Date: ${certificate.startDate}`, 50, 110);
    doc.text(`End Date: ${certificate.endDate}`, 50, 130);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate certificate' });
  }
};

module.exports = { getCertificate, downloadCertificate };
