// src/components/Upload/FileUpload.jsx
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const UploadBox = ({ title, description, accept, onUpload, icon: Icon }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) onUpload(files[0]);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <label className="cursor-pointer">
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Select File
          </span>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [status, setStatus] = useState(null);

  const handleUpload = (file) => {
    // Simulate upload
    setStatus('uploading');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadBox
          title="Upload Paystub"
          description="Upload your paystub in PDF format"
          accept=".pdf"
          onUpload={handleUpload}
          icon={FileText}
        />
        
        <UploadBox
          title="Upload Bank Statement"
          description="Upload your bank statement in PDF or CSV format"
          accept=".pdf,.csv"
          onUpload={handleUpload}
          icon={Upload}
        />
      </div>

      {status === 'uploading' && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2" />
          <span>Uploading file...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>File uploaded successfully!</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Error uploading file. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default UploadPage;