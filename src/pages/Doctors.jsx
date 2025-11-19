// src/pages/Doctors.jsx
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

function Doctors() {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("all");

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

  const specialtyFilters = useMemo(
    () => Array.from(new Set(doctors.map((doctor) => doctor.specialty))),
    []
  );

  const spokenLanguages = useMemo(
    () => new Set(doctors.flatMap((doctor) => doctor.languages)),
    []
  );

  const averageRating = useMemo(
    () => (doctors.reduce((sum, doctor) => sum + doctor.rating, 0) / doctors.length).toFixed(1),
    []
  );

  const collectiveExperience = useMemo(
    () =>
      doctors.reduce((sum, doctor) => {
        const years = parseInt(doctor.experience.replace(/\D/g, ""), 10);
        return sum + (Number.isNaN(years) ? 0 : years);
      }, 0),
    []
  );

  const filteredDoctors = doctors
    .filter((doctor) => {
      const query = search.toLowerCase();
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.education.toLowerCase().includes(query)
      );
    })
    .filter((doctor) =>
      activeSpecialty === "all" ? true : doctor.specialty === activeSpecialty
    );

  const heroStats = [
    {
      label: "Specialists",
      value: doctors.length,
      detail: `${specialtyFilters.length} specialties`,
    },
    {
      label: "Languages",
      value: spokenLanguages.size,
      detail: "Supported for care",
    },
    {
      label: "Avg. rating",
      value: averageRating,
      detail: "Patient satisfaction",
    },
    {
      label: "Experience",
      value: `${collectiveExperience}+ yrs`,
      detail: "Combined expertise",
    },
  ];
  
  return (
    <div className="doctors-page">
      <section className="doctors-hero glass fade-in-up">
        <div className="doctors-hero-text">
          <p className="page-badge">Meet our experts</p>
          <h1>World-class doctors, ready when you are</h1>
          <p className="hero-subtitle">
            Browse top-rated specialists across every major field of medicine. Book an appointment or
            start a secure chat in just a few taps.
          </p>
          <div className="doctors-hero-actions">
            <Link to="/appointment-form" className="btn">
              Book appointment
            </Link>
            <Link to="/doctors-consultation" className="btn btn-secondary">
              Chat with doctors
            </Link>
          </div>
        </div>

        <div className="doctors-hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="doctors-hero-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="doctors-toolbar glass">
        <div className="doctors-search">
          <input
            type="text"
            placeholder="Search by name, specialty, or education..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        <div className="doctors-filters">
          <button
            className={`filter-chip ${activeSpecialty === "all" ? "active" : ""}`}
            onClick={() => setActiveSpecialty("all")}
          >
            All specialties
          </button>
          {specialtyFilters.map((specialty) => (
            <button
              key={specialty}
              className={`filter-chip ${activeSpecialty === specialty ? "active" : ""}`}
              onClick={() => setActiveSpecialty(specialty)}
            >
              {specialty}
            </button>
          ))}
        </div>
      </section>
      
      {filteredDoctors.length > 0 ? (
        <div className="doctors-card-grid">
          {filteredDoctors.map((doctor) => (
            <article key={doctor.id} className="doctor-profile-card glass fade-in-up">
              <header className="doctor-card-header">
                <div className="doctor-card-avatar">{doctor.image}</div>
                <div>
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty-chip">{doctor.specialty}</p>
                  <p className="doctor-education">{doctor.education}</p>
                </div>
                <span className="doctor-rating-chip">⭐ {doctor.rating}</span>
              </header>

              <p className="doctor-description">{doctor.description}</p>

              <div className="doctor-meta-grid">
                <div className="doctor-meta">
                  <span>Experience</span>
                  <strong>{doctor.experience}</strong>
                </div>
                <div className="doctor-meta">
                  <span>Patients helped</span>
                  <strong>{doctor.patients}</strong>
                </div>
                <div className="doctor-meta">
                  <span>Availability</span>
                  <strong>{doctor.availability}</strong>
                </div>
              </div>

              <div className="doctor-languages">
                {doctor.languages.map((language) => (
                  <span key={language} className="doctor-language-chip">
                    {language}
                  </span>
                ))}
              </div>

              <footer className="doctor-card-footer">
                <div className="doctor-availability">
                  <span>🗓</span>
                  <div>
                    <p>Next available</p>
                    <strong>{doctor.availability}</strong>
                  </div>
                </div>
                <Link
                  to={`/book-appointment?doctor=${doctor.id}`}
                  className="doctor-card-btn btn"
                >
                  Book with {doctor.name.split(" ")[1]}
                </Link>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="doctors-empty glass">
          <div className="no-results-icon">🔍</div>
          <h3>No doctors found</h3>
          <p>Try refining your search or reset the filters to browse all specialists.</p>
          <div className="doctors-empty-actions">
            <button
              onClick={() => setSearch("")}
              className="btn btn-secondary"
            >
              Clear search
            </button>
            <button
              onClick={() => setActiveSpecialty("all")}
              className="btn"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
  