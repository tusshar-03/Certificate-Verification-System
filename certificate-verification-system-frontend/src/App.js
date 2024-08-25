// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [certificateID, setCertificateID] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/certificate/${certificateID}`);
      setCertificate(response.data);
    } catch (error) {
      alert('Certificate not found');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/certificate/${certificateID}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${certificateID}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Error downloading certificate');
    }
  };

  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
      
      <h1>Student Portal</h1>
      <input type="text" placeholder="Enter Certificate ID" value={certificateID} onChange={(e) => setCertificateID(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      
      {certificate && (
        <div>
          <h2>Certificate Details</h2>
          <p>Name: {certificate.studentName}</p>
          <p>Internship Domain: {certificate.internshipDomain}</p>
          <p>Start Date: {new Date(certificate.startDate).toDateString()}</p>
          <p>End Date: {new Date(certificate.endDate).toDateString()}</p>
          <button onClick={handleDownload}>Download Certificate</button>
        </div>
      )}
    </div>
  );
}

export default App;
