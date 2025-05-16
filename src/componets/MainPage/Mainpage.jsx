
import React, { useState, useRef,useEffect} from "react";
import "./Mainpage.css";
import tickIcon from "./mainpage_Assets/checkmark.png";
import { RiLoader2Line } from "react-icons/ri";
import downloadIcon from "./mainpage_Assets/download.png";
import { jsPDF } from "jspdf";
import useUserStore from '../../../Zustand_State/UserStore.js';

const Mainpage = () => {
  const [fileType, setFileType] = useState("Sql");
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const fileInputRef = useRef(null);
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
    setIsConverted(false);
    setIsConverting(true);

    // Always reset input value after use
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

    setTimeout(() => {
      setIsConverting(false);
      setIsConverted(true);
    }, 3000);
  };

  const handleDrop = (e) => {
  e.preventDefault();
  const droppedFile = e.dataTransfer.files[0];
  processFileUpload(droppedFile);
        setIsConverted(false);
    setIsConverting(true);

    // Reset file input value so dialog closes
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => {
      setIsConverting(false);
      setIsConverted(true);
    }, 3000);
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


  const handleDownload = () => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;

    // Create a new PDF document
    const doc = new jsPDF();

    // Add the file content to the PDF (split into lines for long text)
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 10);

    // Save the PDF
    doc.save(`${file.name.replace(/\.[^/.]+$/, "")}.pdf`);
  };

  reader.readAsText(file);
};


  
  return (
    <>
    <div className="upload-container">
      <h2>CONVERT CODE TO DOCUMENT</h2>
      <p className="description">
        Auto-generate detailed documentation from any code snippet.
        <br />
        Break down logic, syntax, and structure step by step.
        <br />
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

      <label
        className={`upload-area ${!isPremium && fileType !== 'Sql' ? 'disabled-upload' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        tabIndex={0}
        style={{ cursor: "pointer" }}
      >
        <span className="upload-inline">
          <span className="upload-icon" style={{ verticalAlign: "middle", fontSize: "28px" }}>
            📄
          </span>
          <span
            className="upload-text"
            style={{
              color: "#0056d2",
              fontWeight: "bold",
              margin: "0 6px",
            }}
          >
            Click to upload
          </span>
          or Drag and Drop File or Image.
          <span
            className="file-info"
          >
            Zip, .txt, .png (max: 10MB). Up to 400 lines of code allowed.
          </span>
        </span>
        <input
          type="file"
          id="fileUpload"
          className="file-input"
          onChange={handleFileChange}
          tabIndex={-1}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <p className="file-info">Zip, .txt, .png (max: 10MB). Up to 400 lines of code allowed.</p>
      </label>
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

      {file && (
        <div className="status-container">
          <span className="file-name">{file.name}</span>
          <span
            className={`status ${isConverted ? "converted" : "converting"}`}
          >
            {isConverting && (
              <>
                <RiLoader2Line className="rotating" size={20} color="#0b3d91" />
                &nbsp;Converting...
              </>
            )}
            {isConverted && (
              <>
                <img
                  src={tickIcon}
                  alt="Converted"
                  style={{
                    width: "18px",
                    height: "18px",
                    marginRight: "5px",
                    verticalAlign: "middle",
                  }}
                />
                Converted
              </>
            )}
          </span>
          {isConverted && (
            <button
              className="download-btn"
              onClick={handleDownload}
              title="Download"
            >
              <img
                src={downloadIcon}
                alt="Download"
                style={{
                  width: "26px",
                  height: "26px",
                  verticalAlign: "middle",
                }}
              />
            </button>
          )}
        </div>
      )}
    </div>  
    </>
  );
};

export default Mainpage;

