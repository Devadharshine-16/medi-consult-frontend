// src/pages/Doctors.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

function Doctors() {
  const [search, setSearch] = useState("");
  const doctors = [
    { 
      id: 1,
      name: "Dr. John Smith", 
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      patients: "2,500+",
      image: "🫀",
      description: "Expert in heart health and cardiovascular diseases with extensive experience in interventional cardiology.",
      education: "MD, Harvard Medical School",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 9AM-5PM"
    },
    { 
      id: 2,
      name: "Dr. Emily Davis", 
      specialty: "Dermatologist",
      experience: "12+ years",
      rating: 4.8,
      patients: "1,800+",
      image: "🧴",
      description: "Specialized in skin conditions, cosmetic dermatology, and advanced skin treatments.",
      education: "MD, Stanford University",
      languages: ["English", "French"],
      availability: "Mon-Thu: 8AM-6PM"
    },
    { 
      id: 3,
      name: "Dr. Michael Brown", 
      specialty: "Neurologist",
      experience: "18+ years",
      rating: 4.9,
      patients: "3,200+",
      image: "🧠",
      description: "Leading expert in neurological disorders, stroke treatment, and brain health management.",
      education: "MD, Johns Hopkins University",
      languages: ["English", "German"],
      availability: "Mon-Fri: 7AM-4PM"
    },
    { 
      id: 4,
      name: "Dr. Sarah Wilson", 
      specialty: "Pediatrician",
      experience: "10+ years",
      rating: 4.7,
      patients: "1,500+",
      image: "👶",
      description: "Dedicated to children's health with expertise in developmental pediatrics and preventive care.",
      education: "MD, Boston Children's Hospital",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 9AM-5PM"
    },
    { 
      id: 5,
      name: "Dr. Robert Chen", 
      specialty: "Orthopedic Surgeon",
      experience: "20+ years",
      rating: 4.9,
      patients: "4,000+",
      image: "🦴",
      description: "Specialized in joint replacement, sports medicine, and minimally invasive orthopedic procedures.",
      education: "MD, Mayo Clinic",
      languages: ["English", "Mandarin"],
      availability: "Mon-Wed-Fri: 8AM-6PM"
    },
    { 
      id: 6,
      name: "Dr. Lisa Martinez", 
      specialty: "Psychiatrist",
      experience: "14+ years",
      rating: 4.8,
      patients: "2,100+",
      image: "🧘",
      description: "Expert in mental health, anxiety disorders, and evidence-based therapeutic approaches.",
      education: "MD, Columbia University",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 10AM-6PM"
    },
    { 
      id: 7,
      name: "Dr. James Anderson", 
      specialty: "Gastroenterologist",
      experience: "16+ years",
      rating: 4.8,
      patients: "2,800+",
      image: "🫁",
      description: "Specialized in digestive system disorders, endoscopy, and liver diseases.",
      education: "MD, University of California",
      languages: ["English", "Italian"],
      availability: "Tue-Thu-Sat: 9AM-5PM"
    },
    { 
      id: 8,
      name: "Dr. Maria Rodriguez", 
      specialty: "Gynecologist",
      experience: "13+ years",
      rating: 4.9,
      patients: "2,200+",
      image: "🌸",
      description: "Expert in women's health, reproductive medicine, and preventive care.",
      education: "MD, University of Miami",
      languages: ["English", "Spanish", "Portuguese"],
      availability: "Mon-Fri: 8AM-5PM"
    },
    { 
      id: 9,
      name: "Dr. David Kim", 
      specialty: "Ophthalmologist",
      experience: "11+ years",
      rating: 4.7,
      patients: "1,900+",
      image: "👁️",
      description: "Specialized in eye care, cataract surgery, and vision correction procedures.",
      education: "MD, University of Michigan",
      languages: ["English", "Korean"],
      availability: "Mon-Fri: 9AM-6PM"
    },
    { 
      id: 10,
      name: "Dr. Jennifer Taylor", 
      specialty: "Endocrinologist",
      experience: "9+ years",
      rating: 4.6,
      patients: "1,400+",
      image: "🩺",
      description: "Expert in diabetes management, thyroid disorders, and hormonal imbalances.",
      education: "MD, Northwestern University",
      languages: ["English", "French"],
      availability: "Mon-Thu: 8AM-4PM"
    },
    { 
      id: 11,
      name: "Dr. Ahmed Hassan", 
      specialty: "Urologist",
      experience: "17+ years",
      rating: 4.8,
      patients: "2,600+",
      image: "🔬",
      description: "Specialized in urinary tract disorders, kidney stones, and men's health.",
      education: "MD, University of Texas",
      languages: ["English", "Arabic"],
      availability: "Mon-Fri: 7AM-5PM"
    },
    { 
      id: 12,
      name: "Dr. Rachel Green", 
      specialty: "Pulmonologist",
      experience: "14+ years",
      rating: 4.7,
      patients: "2,000+",
      image: "🫁",
      description: "Expert in respiratory diseases, asthma, COPD, and sleep disorders.",
      education: "MD, University of Pennsylvania",
      languages: ["English", "Hebrew"],
      availability: "Mon-Wed-Fri: 9AM-5PM"
    }
  ];

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
    doctor.education.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="container">
      <div className="hero fade-in-up">
        <h1>Our Expert Doctors</h1>
        <p>Connect with highly qualified medical professionals who are committed to your health and well-being</p>
      </div>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, specialty, or education..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      {filteredDoctors.length > 0 ? (
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card card fade-in-up">
              <div className="doctor-avatar">
                <span className="doctor-image">{doctor.image}</span>
              </div>
              
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <p className="doctor-education">{doctor.education}</p>
                <p className="doctor-description">{doctor.description}</p>
                
                <div className="doctor-details">
                  <div className="detail-item">
                    <span className="detail-icon">🌐</span>
                    <span className="detail-text">{doctor.languages.join(", ")}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🕒</span>
                    <span className="detail-text">{doctor.availability}</span>
                  </div>
                </div>
                
                <div className="doctor-stats">
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">{doctor.rating}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-value">{doctor.patients}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏰</span>
                    <span className="stat-value">{doctor.experience}</span>
                  </div>
                </div>
                
                <Link to={`/book-appointment?doctor=${doctor.id}`} className="btn">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No doctors found</h3>
          <p>Try adjusting your search terms or browse all our doctors</p>
          <button 
            onClick={() => setSearch("")} 
            className="btn btn-secondary"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Doctors;
  