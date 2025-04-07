import React, { useState, useEffect } from 'react';
import { uploadData, getUrl, list } from '@aws-amplify/storage';
import { getCurrentUser } from '@aws-amplify/auth'; // Correct import for Auth
import './FileUpload.css'; // 💅 Custom styling

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [files, setFiles] = useState([]);

  // Load file list on mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const user = await getCurrentUser();  // Get current authenticated user
      const username = user.username;  // Use username as user-specific folder

      // List files under the user's folder (username)
      const { items } = await list(`${username}/`);
      
      const fileData = await Promise.all(
        items.map(async (item) => {
          const { url } = await getUrl({ key: item.key });
          return { name: item.key, url };
        })
      );
      
      setFiles(fileData);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) return alert('Please choose a file');
    setStatus('Uploading...');
    
    try {
      const user = await getCurrentUser();  // Get current authenticated user
      const username = user.username;  // Use username as user-specific folder
      
      // Upload file to the user-specific folder (username)
      await uploadData({
        key: `${username}/${file.name}`,  // Create a user-specific folder
        data: file,
      }).result;
      
      setStatus('Upload successful!');
      setFile(null);
      fetchFiles(); // Refresh file list after successful upload
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('Upload failed!');
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File to AWS S3</h2>
      <div className="upload-box">
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <p>{status}</p>

      <h3>Uploaded Files</h3>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                View
              </a>
              <button onClick={() => handleCopy(file.url)}>Copy URL</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileUpload;
