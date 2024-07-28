// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import "../Sidebar.css"; // Import your Sidebar CS
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleSidebar}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" onClick={toggleSidebar}>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
