import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-brand">
        <a href="/" aria-label="DayTrack home" className="nav-logo" title="DayTrack">DT</a>
        <div>
          <h2>DayTrack</h2>
          <p>Stay focused, finish strong.</p>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>Home</NavLink>
        <NavLink to="/tracker" className={({ isActive }) => isActive ? "link active" : "link"}>Tracker</NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? "link active" : "link"}>Reports</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "link active" : "link"}>About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;