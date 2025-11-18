// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <h1>MediCare+</h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/doctors" className="nav-link" onClick={() => setIsMenuOpen(false)}>Doctors</Link>
          <Link to="/doctors-consultation" className="nav-link" onClick={() => setIsMenuOpen(false)}>Chat with Doctors</Link>
          <Link to="/appointment-form" className="nav-link" onClick={() => setIsMenuOpen(false)}>Book Appointment</Link>
          <Link to="/order-medicine" className="nav-link" onClick={() => setIsMenuOpen(false)}>Order Medicine</Link>
          <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <div className="nav-auth">
            <Link to="/login" className="nav-link login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" className="nav-link register-btn" onClick={() => setIsMenuOpen(false)}>Register</Link>
            <Link to="/contact" className="nav-link register-btn" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
