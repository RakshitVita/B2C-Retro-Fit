import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
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
        {authUser &&
          <button className="btn">
            Try {filenumber}/4  Conversions for Free
          </button>
        }
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
              src={authUser.picture}
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
            {authUser ? (
              <>
                <p>
                  <strong>Name: </strong>{authUser.name || ""} <br />
                  <strong>Email: </strong>{authUser.email || ""}
                </p>
                <button className="logout_button" onClick={logout}>LogOut</button>
              </>
            ) : (
              <p>No user info</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;