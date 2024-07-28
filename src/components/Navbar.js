// Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import "../Navbar.css"; // Import your Navbar CSS

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className={`navbar ${isSidebarOpen ? "open" : ""}`}>
        {/* Burger menu button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
        >
          <span className="burger-icon">&#9776;</span>
        </button>
        <Link to="/" className="navbar-brand">
          Phishing Detection <sub>by Tech Tracers</sub>
        </Link>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
