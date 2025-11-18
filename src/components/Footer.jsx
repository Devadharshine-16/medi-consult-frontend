// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MediCare+</h3>
          <p>Your trusted partner for online medical consultations</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/appointment-form">Book Appointment</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 support@medicare.com</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>📍 123 Medical Center Dr, Healthcare City</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 MediCare+. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
  