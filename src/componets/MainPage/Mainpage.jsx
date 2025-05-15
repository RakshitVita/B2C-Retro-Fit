import React,{useState} from 'react'
import Maincontainer from '../Maincontainer'
import './Mainpage.css';
const Mainpage = () => {
  const [fileType, setFileType] = useState('Sql');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
  <Maincontainer>
    <div className="upload-container">
      <h2>CONVERT CODE TO DOCUMENT</h2>
      <p className="description">
        Auto-generate detailed documentation from any code snippet.<br />
        Break down logic, syntax, and structure step by step.<br />
        Ideal for teaching, reviewing, or sharing.
      </p>

      <div className="dropdown-section">
        <label htmlFor="fileType">Choose your Code</label>
        <select
          id="fileType"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="Sql">Sql</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <div
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <label htmlFor="fileUpload" className="upload-label">
          <span className="upload-icon">📄</span><br />
          <span className="upload-text">Click to upload</span> or Drag and Drop File or Image
        </label>
        <input
          type="file"
          id="fileUpload"
          className="file-input"
          onChange={handleFileChange}
        />
        <p className="file-info">Zip, .txt, .png (max: 10MB). Up to 400 lines of code allowed.</p>
      </div>

      {file && <p className="selected-file">Selected File: {file.name}</p>}
    </div>
  </Maincontainer>
        
    
    </>
  )
}

export default Mainpage