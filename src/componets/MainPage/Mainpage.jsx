import React,{useState,useEffect} from 'react'
import './Mainpage.css';
import useUserStore from '../../../Zustand_State/UserStore.js';
const Mainpage = () => {
  const [fileType, setFileType] = useState('Sql');
  const [file, setFile] = useState(null);
  const [languagelimiterror, setLanguagelimiterror] = useState(false);
  const [formatError, setFormatError] = useState('')

  const {validateFileUpload, lineLimitError,isPremium,fetchUserStatus,setLineLimitError}=useUserStore();

  useEffect(() => {
    fetchUserStatus(); // optional if already called globally
  }, []);

  

  const allowedExtensions = {
  Sql: ['.sql', '.txt'],
  JavaScript: ['.js'],
  Python: ['.py'],
  Java: ['.java'],
  };

  const isValidExtension = (fileName, language) => {
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return allowedExtensions[language]?.includes(ext);
  };

const processFileUpload = async (file) => {
  //reset all errors before
  setFormatError('');
  setLanguagelimiterror(false);
  setLineLimitError(false);
  if (!file) return;

  // Block non-premium users from using other than SQL
  if (!isPremium && fileType !== 'Sql') {
    setLanguagelimiterror(true);
    setFormatError('');
    setFile(null);
    return;
  }

  // Format validation
  if (!isValidExtension(file.name, fileType)) {
    setFormatError(`Invalid file format. Expected ${allowedExtensions[fileType].join(', ')}`);
    setLanguagelimiterror(false);
    setFile(null);
    return;
  }

  // For free users, check line limit only for SQL
  if (!isPremium && fileType === 'Sql') {
    const isAllowed = await validateFileUpload(file); // This will internally check for <= 400 lines
    if (!isAllowed) {
      setFormatError('');
      setFile(null);
      return;
    }
  }

  // All validations passed
  setFile(file);
  setFormatError('');
  setLanguagelimiterror(false);
};

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    processFileUpload(uploadedFile);
  };

  const handleDrop = (e) => {
  e.preventDefault();
  const droppedFile = e.dataTransfer.files[0];
  processFileUpload(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    };
  const handleFiletypeChange =(e)=>{
    //resetting all errors first
      setFormatError('');
  setLanguagelimiterror(false);
  setLineLimitError(false);
    const selected=e.target.value;

    setFileType(selected);
    if(!isPremium && selected !== 'Sql'){
      setLanguagelimiterror(true);
    }
    else{
      setLanguagelimiterror(false)
    }
  };
  
  return (
    <>
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
          onChange={handleFiletypeChange}
        >
          <option value="Sql">Sql</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      <div
        className={`upload-area ${!isPremium && fileType !== 'Sql' ? 'disabled-upload' : ''}`}
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
      {/*Line Limit error*/}
      {lineLimitError &&<p className='error-text'> {lineLimitError} </p>}
      {/* format Error */}
      {formatError && <p className="error-text">{formatError}</p>}
              {/* Error message if restricted */}
        {languagelimiterror && (
          <p style={{ color: 'red', marginTop: '8px' }}>
            Free version only supports SQL conversion. Upgrade to use other languages.
          </p>
        )}

      {file && <p className="selected-file">Selected File: {file.name}</p>}
    </div>

        
    
    </>
  )
}

export default Mainpage