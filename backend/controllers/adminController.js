const multer = require('multer');
const exceljs = require('exceljs');
const Certificate = require('../models/Certificate');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadExcel = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);

    const certificates = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const [certificateID, studentName, internshipDomain, startDate, endDate] = row.values.slice(1);
        certificates.push({
          certificateID,
          studentName,
          internshipDomain,
          startDate,
          endDate
        });
      }
    });

    await Certificate.insertMany(certificates);
    res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process data' });
  }
};

module.exports = { upload, uploadExcel };
