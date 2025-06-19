import React from "react";
import { FiInfo } from "react-icons/fi";
import "./InfoTooltip.css"; // Style as neede

const InfoTooltip = ({ details }) => {
  return (
 <div className="info-tooltip-wrapper">
      <FiInfo className="info-icon" />
      <div className="tooltip-text">
        <ul>
          {details.map((obj, idx) => {
            const [file, msg] = Object.entries(obj)[0];
            return (
              <li key={idx}>
                <strong>{file}</strong>: {msg}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

export default InfoTooltip
