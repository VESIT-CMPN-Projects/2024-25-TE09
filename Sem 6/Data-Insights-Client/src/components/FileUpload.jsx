// components/FileUploadSection.jsx
import React from "react";

const FileUploadSection = ({ handleFileUpload, fileStatus }) => {
  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  return (
    <div className="file-upload-section">
      <div className="file-upload">
        <input type="file" accept=".csv" onChange={onFileChange} />
      </div>
      {fileStatus && (
        <div className="file-status">File uploaded: {fileStatus.name}</div>
      )}
    </div>
  );
};

export default FileUploadSection;