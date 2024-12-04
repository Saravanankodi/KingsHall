import React, { useState } from 'react';
// import { fetchDataFromDynamoDB } from './dynamoService';

const DownloadBtn = () => {
  const [loading, setLoading] = useState(false);

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    return [headers, ...rows].join("\n");
  };
  
  const downloadCSV = (csv, filename = 'data.csv') => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleDownload = async () => {
    setLoading(true);
    try {
      const data = await fetchDataFromDynamoDB('YourTableName');
      if (data.length) {
        const csv = convertToCSV(data);
        downloadCSV(csv);
      } else {
        alert('No data found in DynamoDB.');
      }
    } catch (error) {
      alert("Error downloading data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} className='btn download-btn'>
        {loading ? 'Downloading...' : 'Download Data'}
      </button>
    </div>
  );
};

export default DownloadBtn;
