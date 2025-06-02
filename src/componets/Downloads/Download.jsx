import React, { useEffect } from "react";
import Maincontainer from "../Template_container/Maincontainer";
import { FiDownload } from "react-icons/fi";
import useUserStore from "../../../Zustand_State/UserStore";
import "react-toastify/dist/ReactToastify.css";
import "./Download.scss";

const Download = () => {
  const { downloads, downloadsLoading, fetchDownloads } = useUserStore();

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleDownload = async (fileName, fileUrl) => {
    if (!fileUrl) {
      alert("No download URL available for this file.");
      return;
    }
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("File not found or server error");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please check the file path or try again.");
    }
  };

  return (
    <Maincontainer>
      <div className="downloads-log">
        <h2>Downloads Log</h2>
        {downloadsLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Language</th>
                <th>File Name</th>
                <th>File Size</th>
                <th>Lines of Code</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((entry, idx) => (
                <tr key={entry.filename + idx}>
                  <td>{entry.language}</td>
                  <td>{entry.filename}</td>
                  <td>{entry.file_size}</td>
                  <td>{entry.code_lines}</td>
                  <td>
                    {entry.url ? (
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(entry.filename, entry.url)}
                      >
                        <FiDownload />
                      </button>
                    ) : (
                      <span style={{ color: "#aaa" }}>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Maincontainer>
  );
};

export default Download;
