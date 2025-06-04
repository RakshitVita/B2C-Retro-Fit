import React, { useEffect } from "react";
import Maincontainer from "../Template_container/Maincontainer";
import { FiDownload } from "react-icons/fi";
import useUserStore from "../../../Zustand_State/UserStore";
import "react-toastify/dist/ReactToastify.css";
import "./Download.scss";
import UserStore from "../../../Zustand_State/UserStore";

const Download = () => {
  const { downloads, downloadsLoading, fetchDownloads, getAndDownloadFile } =
    UserStore();

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

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
                        onClick={() => getAndDownloadFile(entry.filename)}
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
