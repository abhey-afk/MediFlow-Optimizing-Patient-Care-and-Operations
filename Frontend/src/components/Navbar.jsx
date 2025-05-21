import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaHome, FaCalendarAlt, FaUserMd, FaHospital, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/appointments", label: "Appointments", icon: <FaCalendarAlt /> },
    { path: "/doctors", label: "Doctors", icon: <FaUserMd /> },
    { path: "/hospitals", label: "Hospitals", icon: <FaHospital /> },
  ];

  return (
    <nav className="navbar-new">
      <div className="navbar-new-container">
        {/* Left: Logo */}
        <div className="navbar-new-left">
          <Link to="/" className="navbar-new-logo">
            <span role="img" aria-label="logo" className="navbar-new-logo-icon">🏥</span>
          </Link>
        </div>
        {/* Center: Navigation */}
        <div className="navbar-new-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="navbar-new-link">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
        {/* Right: Auth/User */}
        <div className="navbar-new-right">
          {user ? (
            <div className="navbar-new-user">
              <FaUser className="navbar-new-user-icon" />
              <span className="navbar-new-username">{user.firstName}</span>
              <button className="navbar-new-logout" onClick={handleLogout} title="Logout">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="navbar-new-auth">
              <Link to="/login" className="navbar-new-login">Sign In</Link>
              <Link to="/register" className="navbar-new-register">Create Account</Link>
            </div>
          )}
          {/* Mobile menu button */}
          <button className="navbar-new-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-new-mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="navbar-new-link" onClick={() => setMobileOpen(false)}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          {user ? (
            <button className="navbar-new-mobile-logout" onClick={() => { handleLogout(); setMobileOpen(false); }}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <div className="navbar-new-mobile-auth">
              <Link to="/login" className="navbar-new-login" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/register" className="navbar-new-register" onClick={() => setMobileOpen(false)}>Create Account</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 