import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaChartBar, FaSignOutAlt } from "react-icons/fa"; // Import icons
import "./Navbar.css";
import useAuthStore from "../../../Zustand_State/AuthStore";

const Navbar = ({
  notifications = [],
  filenumber,
}) => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (filenumber > 4) {
      alert("You have exceeded your 4 free SQL code conversions.");
      navigate("/subscriptions");
    }
  }, [filenumber, navigate]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/assets/logo.png" alt="logo" />
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
        {/* Notifications */}
        {authUser &&
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
        }
        {/* Profile Dropdown */}
        <div className="profile-dropdown" ref={dropdownRef}>
          {authUser && authUser.picture && (
            <img
              src={authUser.picture || "../public/assets/noProfirle.svg"}
              alt="User profile"
              className="profile-img"
              onClick={() => setDropdownOpen((open) => !open)}
              style={{ cursor: "pointer" }}
            />
          )}
          <div
            className="dropdown-content"
            style={{ display: dropdownOpen ? "block" : "none" }}
          >
            <button className="dropdown-btn" onClick={() => {
              setDropdownOpen(false);
              navigate("/SubscriptionDashboard");
            }}>
              <FaChartBar className="Uicon" /> {/* Icon for Check Usage */}
              Check Usage
            </button>

            <button className="dropdown-btn logout-btn" onClick={logout}>
              <FaSignOutAlt className="Licon" /> {/* Icon for Logout */}
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;