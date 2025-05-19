import React, { useEffect, useState } from "react";
import Maincontainer from "../Template_container/Maincontainer";
import { FiDownload } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./Download.scss";

const Download = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/download-history")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch download history.");
        return res.json();
      })
       .then((data) => {
        const sortedData = data.sort((a, b) => {
          const [d1, m1, y1] = a.activityLog.split(".").map(Number);
          const [d2, m2, y2] = b.activityLog.split(".").map(Number);
          return new Date(b.activityLog.split("/").reverse().join("/")) - new Date(a.activityLog.split("/").reverse().join("/"));

        });
        setDownloads(sortedData);
      })
      .catch((err) => {
        console.error("Error fetching download history:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (fileName, fileUrl) => {
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
      window.URL.revokeObjectURL(url); // clean up blob URL
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please check the file path or try again.");
    }
  };

  return (
    <Maincontainer>
      <div className="downloads-log">
        <h2>Downloads Log</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Code Type</th>
                <th>Activity Log</th>
                <th>File Name</th>
                <th>File Size</th>
                <th>Lines of Code</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.codeType}</td>
                  <td>{entry.activityLog}</td>
                  <td>{entry.fileName}</td>
                  <td>{entry.fileSize}</td>
                  <td>{entry.linesOfCode}</td>
                  <td>
                    <button
                      className="download-btn"
                      onClick={() =>
                        handleDownload(entry.fileName, entry.fileUrl)
                      }
                    >
                      <FiDownload />
                    </button>
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
