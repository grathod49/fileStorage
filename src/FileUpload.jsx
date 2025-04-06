import React, { useState } from 'react';
import { uploadData } from '@aws-amplify/storage';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please choose a file');
    setStatus('Uploading...');

    try {
      const result = await uploadData({
        key: file.name,
        data: file,
      }).result;
      console.log('Upload success:', result);
      setStatus('Upload successful!');
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('Upload failed!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload to S3</button>
      <p>{status}</p>
    </div>
  );
}

export default FileUpload;
