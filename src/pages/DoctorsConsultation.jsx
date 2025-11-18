import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorsConsultation.css";

function DoctorsConsultation() {
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock doctors data with online status
  const [doctors, setDoctors] = useState([
    { 
      id: 1,
      name: "Dr. John Smith", 
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      patients: "2,500+",
      image: "🫀",
      description: "Expert in heart health and cardiovascular diseases.",
      education: "MD, Harvard Medical School",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 9AM-5PM",
      isOnline: true,
      lastSeen: "Online now"
    },
    { 
      id: 2,
      name: "Dr. Emily Davis", 
      specialty: "Dermatologist",
      experience: "12+ years",
      rating: 4.8,
      patients: "1,800+",
      image: "🧴",
      description: "Specialized in skin conditions and cosmetic dermatology.",
      education: "MD, Stanford University",
      languages: ["English", "French"],
      availability: "Mon-Thu: 8AM-6PM",
      isOnline: true,
      lastSeen: "Online now"
    },
    { 
      id: 3,
      name: "Dr. Michael Brown", 
      specialty: "Neurologist",
      experience: "18+ years",
      rating: 4.9,
      patients: "3,200+",
      image: "🧠",
      description: "Leading expert in neurological disorders and stroke treatment.",
      education: "MD, Johns Hopkins University",
      languages: ["English", "German"],
      availability: "Mon-Fri: 7AM-4PM",
      isOnline: false,
      lastSeen: "Last seen 2 hours ago"
    },
    { 
      id: 4,
      name: "Dr. Sarah Wilson", 
      specialty: "Pediatrician",
      experience: "10+ years",
      rating: 4.7,
      patients: "1,500+",
      image: "👶",
      description: "Dedicated to children's health and developmental pediatrics.",
      education: "MD, Boston Children's Hospital",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 9AM-5PM",
      isOnline: true,
      lastSeen: "Online now"
    },
    { 
      id: 5,
      name: "Dr. Robert Chen", 
      specialty: "Orthopedic Surgeon",
      experience: "20+ years",
      rating: 4.9,
      patients: "4,000+",
      image: "🦴",
      description: "Specialized in joint replacement and sports medicine.",
      education: "MD, Mayo Clinic",
      languages: ["English", "Mandarin"],
      availability: "Mon-Wed-Fri: 8AM-6PM",
      isOnline: false,
      lastSeen: "Last seen 1 day ago"
    },
    { 
      id: 6,
      name: "Dr. Lisa Martinez", 
      specialty: "Psychiatrist",
      experience: "14+ years",
      rating: 4.8,
      patients: "2,100+",
      image: "🧘",
      description: "Expert in mental health and anxiety disorders.",
      education: "MD, Columbia University",
      languages: ["English", "Spanish"],
      availability: "Mon-Fri: 10AM-6PM",
      isOnline: true,
      lastSeen: "Online now"
    }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
    doctor.education.toLowerCase().includes(search.toLowerCase())
  );

  // Filter online doctors
  const onlineDoctors = filteredDoctors.filter(doctor => doctor.isOnline);

  const handleStartChat = (doctor) => {
    setSelectedDoctor(doctor);
    // Initialize chat with welcome message
    setChatMessages([
      {
        id: 1,
        sender: 'doctor',
        message: `Hello! I'm Dr. ${doctor.name}. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const handleChatButtonClick = (e, doctor) => {
    e.stopPropagation(); // Prevent event bubbling to parent card
    handleStartChat(doctor);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedDoctor) {
      const message = {
        id: Date.now(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Simulate doctor response after 2 seconds
      setTimeout(() => {
        const responses = [
          "I understand your concern. Can you provide more details?",
          "That's a common issue. Let me help you with that.",
          "Based on what you've described, I recommend...",
          "Have you experienced this before?",
          "I suggest we discuss this further. Would you like to schedule a follow-up?"
        ];
        
        const doctorResponse = {
          id: Date.now() + 1,
          sender: 'doctor',
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString()
        };
        
        setChatMessages(prev => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="consultation-container">
      <div className="consultation-content">
        {/* Header */}
        <div className="consultation-header">
          <h1 className="consultation-title">
            Online Doctor Consultation 💬
          </h1>
          <p className="consultation-subtitle">
            Chat with our qualified doctors in real-time for immediate medical advice
          </p>
        </div>

        <div className="consultation-grid">
          {/* Left Panel - Doctors List */}
          <div className="doctors-panel">
            {/* Search Box */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Online Doctors */}
            <div className="doctors-list">
              <h3 className="section-title online-title">
                <span className="status-indicator status-online"></span>
                Online Doctors ({onlineDoctors.length})
              </h3>
              
              <div className="doctors-grid">
                {onlineDoctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                    onClick={() => handleStartChat(doctor)}
                  >
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        {doctor.image}
                      </div>
                      <div className="doctor-details">
                        <h4 className="doctor-name">{doctor.name}</h4>
                        <p className="doctor-specialty">{doctor.specialty}</p>
                        <div className="doctor-status">
                          <span className="status-indicator status-online"></span>
                          <span className="status-online-text">{doctor.lastSeen}</span>
                        </div>
                      </div>
                      <div className="doctor-actions">
                        <div className="doctor-rating">
                          <span>⭐</span>
                          <span>{doctor.rating}</span>
                        </div>
                        <button 
                          className="chat-button"
                          onClick={(e) => handleChatButtonClick(e, doctor)}
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Offline Doctors */}
              {filteredDoctors.filter(d => !d.isOnline).length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 className="section-title offline-title">
                    <span className="status-indicator status-offline"></span>
                    Offline Doctors
                  </h3>
                  
                  <div className="doctors-grid">
                    {filteredDoctors.filter(d => !d.isOnline).map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className="doctor-card offline"
                      >
                        <div className="doctor-info">
                          <div className="doctor-avatar">
                            {doctor.image}
                          </div>
                          <div className="doctor-details">
                            <h4 className="doctor-name">{doctor.name}</h4>
                            <p className="doctor-specialty">{doctor.specialty}</p>
                            <div className="doctor-status">
                              <span className="status-indicator status-offline"></span>
                              <span className="status-offline-text">{doctor.lastSeen}</span>
                            </div>
                          </div>
                          <div className="doctor-actions">
                            <div className="doctor-rating">
                              <span>⭐</span>
                              <span>{doctor.rating}</span>
                            </div>
                            <button className="chat-button" disabled>
                              Offline
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="chat-panel">
            {selectedDoctor ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="doctor-avatar">
                    {selectedDoctor.image}
                  </div>
                  <div className="chat-doctor-info">
                    <h3 className="chat-doctor-name">{selectedDoctor.name}</h3>
                    <p className="chat-doctor-specialty">{selectedDoctor.specialty}</p>
                    <div className="chat-doctor-status">
                      <span className="status-indicator status-online"></span>
                      <span>Online</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDoctor(null)}
                    className="close-button"
                  >
                    ✕
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`message ${msg.sender}`}
                    >
                      <div className="message-bubble">
                        <p>{msg.message}</p>
                        <p className="message-time">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="chat-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="chat-input"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="send-button"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <h3 className="empty-state-title">Select a Doctor to Start Chatting</h3>
                <p className="empty-state-description">
                  Choose an online doctor from the list to begin your consultation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorsConsultation;
