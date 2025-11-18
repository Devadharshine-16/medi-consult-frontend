// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  
  return (
    <div className="container">
      <div className="hero fade-in-up">
        <h1>Online Medical Consultation</h1>
        <p>Book appointments and consult with expert doctors from your home. Get professional medical advice 24/7 with our secure and convenient platform.</p>
        
        <div className="hero-buttons">
          <Link to="/book-appointment" className="btn">Get Started</Link>
          <Link to="/doctors" className="btn btn-secondary">Find Doctors</Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="card fade-in-up">
          <div className="card-icon">🏥</div>
          <h3>24/7 Access</h3>
          <p>Consult doctors anytime, anywhere from your phone or laptop. No more waiting in queues or rushing to clinics.</p>
        </div>

        <div className="card fade-in-up">
          <div className="card-icon">👨‍⚕️</div>
          <h3>Expert Doctors</h3>
          <p>Connect with specialists with years of trusted experience. All our doctors are verified and certified professionals.</p>
        </div>

        <div className="card fade-in-up">
          <div className="card-icon">📱</div>
          <h3>Easy Booking</h3>
          <p>Simple & fast appointment booking in just a few clicks. Manage your appointments with our intuitive interface.</p>
        </div>
      </div>

     
    </div>
  );
}

export default Home;
