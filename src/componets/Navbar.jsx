import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({
  notifications = [],
  profileFields = [],
  avatar = "https://via.placeholder.com/36",
  filenumber,
}) => {
  useEffect(() => {
    if (filenumber > 4) {
      alert("You have exceeded your 4 free SQL code conversions.");
    }
  }, [filenumber]);
  

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
  <img src="/assets/logo.jpg" alt="logo" />
  <b>RETRO FIT</b>

</div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/downloads">Downloads&nbsp;Log</Link>
        <Link to="/subscriptions">Subscriptions</Link>
      </div>

      {/* Right Actions */}
      <div className="action-buttons">
        <button className="btn">
          Try {filenumber}/4 SQL Code Conversions for Free
        </button>

        {/* Notifications */}
        <div className="icon-dropdown">
          <FaBell size={20} className="icon" />
          <div className="dropdown-content">
            {notifications.length ? (
              notifications.map((note, i) => (
                <p key={i} className="dropdown-line">• {note}</p>
              ))
            ) : (
              <p className="dropdown-line">No notifications</p>
            )}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <img src={avatar} alt="User profile" className="profile-img" />
          <div className="dropdown-content">
            {profileFields.map(({ label, value }) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


