import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const StudentPortal = () => {
  const [certificateID, setCertificateID] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/certificates/${certificateID}`);
      setCertificate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`/api/certificates/${certificateID}/download`, { responseType: 'blob' });
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, `${certificateID}.pdf`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Student Portal</h1>
      <input
        type="text"
        placeholder="Enter Certificate ID"
        value={certificateID}
        onChange={(e) => setCertificateID(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {certificate && (
        <div>
          <p>Name: {certificate.studentName}</p>
          <p>Internship Domain: {certificate.internshipDomain}</p>
          <p>Start Date: {certificate.startDate}</p>
          <p>End Date: {certificate.endDate}</p>
          <button onClick={handleDownload}>Download Certificate</button>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
