import React, { useState, useRef } from "react";
import Maincontainer from "../Maincontainer";
import "./Mainpage.css";
import tickIcon from "./mainpage_Assets/checkmark.png";
import { RiLoader2Line } from "react-icons/ri";
import downloadIcon from "./mainpage_Assets/download.png";
import { jsPDF } from "jspdf";

const Mainpage = () => {
  const [fileType, setFileType] = useState("Sql");
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
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
    setFile(droppedFile);
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
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="Sql">Sql</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>

      {/* Responsive upload area */}
      <label
        htmlFor="fileUpload"
        className="upload-area"
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
            style={{
              color: "#888",
              marginLeft: "6px",
              fontSize: "13px",
            }}
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
      </label>

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
  );
};

export default Mainpage;
