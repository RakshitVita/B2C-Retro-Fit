import React, { useEffect, useState } from "react";
import Maincontainer from "../Template_container/Maincontainer";
import { FiDownload, FiLoader } from "react-icons/fi";
import "./Download.scss";
import useUserStore from "../../../Zustand_State/UserStore";
import useAuthStore from "../../../Zustand_State/AuthStore";
import InfoTooltip from "../../ReusableComponents/InfoToolTip/InfoTooltip";

const Download = () => {
  const { downloads, downloadsLoading, fetchDownloads, getAndDownloadFile } =
    useUserStore();
  const { authUser } = useAuthStore();
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchDownloads();
    }
  }, [authUser, fetchDownloads]);

  const handleDownload = async (filename, fileId) => {
    setDownloadingId(fileId);
    await getAndDownloadFile(filename, fileId);
    setDownloadingId(null);
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
                  <td>{entry.filename}
                    {entry.sub_file_details?.length > 0 && (
                      <InfoTooltip details={entry.sub_file_details} />
                    )}

                  </td>
                  <td>{entry.file_size}</td>
                  <td>{entry.code_lines}</td>
                  <td style={{ display: "none" }}>{entry.file_id}</td>
                  <td>
                    {entry.url ? (
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(entry.filename, entry.file_id)}
                        disabled={downloadingId === entry.file_id}
                      >
                        {downloadingId === entry.file_id ? (
                          <FiLoader style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                          <FiDownload />
                        )}
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
