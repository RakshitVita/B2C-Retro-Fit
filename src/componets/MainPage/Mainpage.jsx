import React, { useState, useRef, useEffect } from "react";
import "./Mainpage.css";
import tickIcon from "./mainpage_Assets/checkmark.png";
import { RiLoader2Line } from "react-icons/ri";
import downloadIcon from "./mainpage_Assets/download.png";
import useUserStore from '../../../Zustand_State/UserStore.js';
import useAuthStore from '../../../Zustand_State/AuthStore.js';
import LoginG from "../Google_Login/LoginG.jsx";
import { useNavigate } from "react-router-dom";

const allowedExtensions = {
  Sql: ['.sql', '.txt'],
  JavaScript: ['.js'],
  Python: ['.py'],
  Java: ['.java'],
};

const Mainpage = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("Sql");
  const [file, setFile] = useState(null);
  const [isConverted, setIsConverted] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [languagelimiterror, setLanguagelimiterror] = useState(false);
  const [formatError, setFormatError] = useState('');
  const fileInputRef = useRef(null);

  const {
    isPremium,
    lineLimitError,
    setLineLimitError,
    validateFileUpload,
    convertFile,
    convertedFile,
    isLoading,
    setIsLoading,
  } = useUserStore();

  const { authUser } = useAuthStore();

  // Handle Escape key to close login popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowLoginPopup(false);
    };
    if (showLoginPopup) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showLoginPopup]);


  const isValidExtension = (fileName, language) => {
    const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return allowedExtensions[language]?.includes(ext);
  };

  const processFileUpload = async (file) => {
    setFormatError('');
    setLanguagelimiterror(false);
    setLineLimitError(false);
    if (!file) return false;

    // Block non-premium users from using other than SQL
    if (!isPremium && fileType !== 'Sql') {
      setLanguagelimiterror(true);
      setFormatError('');
      return false;
    }

    // Format validation
    if (!isValidExtension(file.name, fileType)) {
      setFormatError(`Invalid file format. Expected ${allowedExtensions[fileType].join(', ')}`);
      setLanguagelimiterror(false);
      return false;
    }

    // For free users, check line limit only for SQL
    if (!isPremium && fileType === 'Sql') {
      const isAllowed = await validateFileUpload(file);
      if (!isAllowed) {
        setFormatError('');
        return false;
      }
    }

    // All validations passed
    setFormatError('');
    setLanguagelimiterror(false);
    return true;
  };

  const handleFiletypeChange = (e) => {
    const selected = e.target.value;
    setFileType(selected);
    setFile(null);
    setIsConverted(false);
    setFormatError('');
    setLanguagelimiterror(false);
    setLineLimitError(false);
    if (!isPremium && selected !== 'Sql') {
      setLanguagelimiterror(true);
    } else {
      setLanguagelimiterror(false);
    }
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setIsConverted(false);



    // For subsequent uploads or after login, always do real API logic
    setIsLoading(true);
    setLineLimitError('');
    const passedValidation = await processFileUpload(uploadedFile);
    if (!passedValidation) {
      setIsLoading(false);
      return;
    }

    await convertFile(uploadedFile, fileType);
    setIsLoading(false);
    setIsConverted(true);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const handleDownload = async () => {
    if (!authUser) {
      return;
    }
    // If already converted for real, allow download
    if (convertedFile) {
      const url = window.URL.createObjectURL(convertedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.[^/.]+$/, "")}_converted.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // If not converted for real, do real conversion now
    setIsLoading(true);
    setLineLimitError('');
    const passedValidation = await processFileUpload(file);
    if (!passedValidation) {
      setIsLoading(false);
      return;
    }
    await convertFile(file, fileType);
    setIsLoading(false);
    setIsConverted(true);
  };

  // Intercept click on upload area
  const handleUploadAreaClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      setShowLoginPopup(true);
      return;
    }
    // If logged in, trigger file input
    fileInputRef.current && fileInputRef.current.click();
  };

  // Intercept drag and drop
  const handleDrop = async (e) => {
    e.preventDefault();
    if (!authUser) {
      setShowLoginPopup(true);
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = { target: { files: e.dataTransfer.files } };
      await handleFileChange(fakeEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
          onClick={handleUploadAreaClick}
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
            <span className="file-info">
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
        </label>

        {/* Error messages */}
        {lineLimitError && <p className='error-text'> {lineLimitError} </p>}
        {formatError && <p className="error-text">{formatError}</p>}
        {languagelimiterror && (
          <p style={{ color: 'red', marginTop: '8px' }}>
            Free version only supports SQL conversion. Upgrade to use other languages.
          </p>
        )}

        {/* Status and Download */}
        {file && (
          <div className="status-container">
            <span className="file-name">{file.name}</span>
            <span className={`status ${isConverted ? "converted" : "converting"}`}>
              {isLoading ? (
                <>
                  <RiLoader2Line className="rotating" size={20} color="#0b3d91" />
                  &nbsp;Converting...
                </>
              ) : isConverted ? (
                <>
                  <img src={tickIcon} alt="Converted" className="tick-icon" />
                  Converted
                </>
              ) : null}
            </span>
            {/* Only show download if real conversion is done */}
            {isConverted && convertedFile && (
              <button className="download-btn" onClick={handleDownload} title="Download">
                <img src={downloadIcon} alt="Download" style={{ width: "26px", height: "26px" }} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Login popup/modal */}
      {showLoginPopup && (
        <div
          className="modal-backdrop"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <LoginG onClose={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Mainpage;