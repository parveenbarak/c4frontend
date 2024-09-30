import { useState } from 'react';
import axios from 'axios';
import './fileUpload.css';

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:9000/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    })
    .then(() => {
      alert("File uploaded successfully");
    })
    .catch((err) => {
      console.error("File upload error", err);
    });
  };

  return (
    <div className="uploadContainer">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && (
        <div className="uploadProgress">
          <div className="progressBar" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};
