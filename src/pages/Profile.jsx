import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Get appointments from localStorage
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // In real app: fetch from backend/localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      age: 28,
      gender: "Male",
      address: "123 Main Street, City, State 12345",
      emergencyContact: "Jane Doe - +1 (555) 987-6543",
      bloodType: "O+",
      height: "175 cm",
      weight: "70 kg",
      allergies: "None",
      medications: "Vitamin D, Omega-3",
      medicalHistory: "Appendectomy (2018), Fractured wrist (2015)",
      insuranceProvider: "HealthPlus Insurance",
      insuranceNumber: "HP-123456789",
      lastCheckup: "2023-05-15",
    };
    setUser(storedUser);

    // Load appointments from localStorage
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <p>Manage your personal information and view your appointments</p>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Personal Info
        </button>
        <button
          className={`tab-btn ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
      </div>

      <div className="profile-content p-4">
        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-secondary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={user.age}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={user.bloodType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    className="form-input"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={user.emergencyContact}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Name - Phone Number"
                  />
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 text-teal-700">Health Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      id="height"
                      name="height"
                      value={user.height}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 175 cm"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={user.weight}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 70 kg"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="allergies">Allergies</label>
                  <input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={user.allergies}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="List any allergies"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="medications">Current Medications</label>
                  <textarea
                    id="medications"
                    name="medications"
                    value={user.medications}
                    onChange={handleChange}
                    className="form-input"
                    rows="2"
                    placeholder="List current medications"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="medicalHistory">Medical History</label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={user.medicalHistory}
                    onChange={handleChange}
                    className="form-input"
                    rows="3"
                    placeholder="Significant medical history"
                  />
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3 text-teal-700">Insurance Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="insuranceProvider">Insurance Provider</label>
                    <input
                      type="text"
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={user.insuranceProvider}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="insuranceNumber">Insurance Number</label>
                    <input
                      type="text"
                      id="insuranceNumber"
                      name="insuranceNumber"
                      value={user.insuranceNumber}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastCheckup">Last Checkup Date</label>
                  <input
                    type="date"
                    id="lastCheckup"
                    name="lastCheckup"
                    value={user.lastCheckup}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleSave} className="btn">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{user.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Age</span>
                    <span className="info-value">{user.age} years</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender</span>
                    <span className="info-value">{user.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Blood Type</span>
                    <span className="info-value">{user.bloodType}</span>
                  </div>
                </div>
                
                <div className="info-section">
                  <h3>Address</h3>
                  <p>{user.address}</p>
                </div>
                
                <div className="info-section">
                  <h3>Emergency Contact</h3>
                  <p>{user.emergencyContact}</p>
                </div>
                
                <div className="section-divider mt-6 mb-4"></div>
                
                <h3 className="text-lg font-semibold mb-4 text-teal-700">Health Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Height</span>
                    <span className="info-value">{user.height}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Weight</span>
                    <span className="info-value">{user.weight}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Allergies</span>
                    <span className="info-value">{user.allergies || "None"}</span>
                  </div>
                </div>
                
                <div className="info-section mt-4">
                  <h3>Current Medications</h3>
                  <p>{user.medications || "None"}</p>
                </div>
                
                <div className="info-section">
                  <h3>Medical History</h3>
                  <p>{user.medicalHistory || "No significant medical history"}</p>
                </div>
                
                <div className="section-divider mt-6 mb-4"></div>
                
                <h3 className="text-lg font-semibold mb-4 text-teal-700">Insurance Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Insurance Provider</span>
                    <span className="info-value">{user.insuranceProvider}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Insurance Number</span>
                    <span className="info-value">{user.insuranceNumber}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Checkup</span>
                    <span className="info-value">
                      {user.lastCheckup ? new Date(user.lastCheckup).toLocaleDateString() : "Not available"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="appointments-section">
            <div className="section-header">
              <h2>Your Appointments</h2>
              <p className="text-gray-600">
                Upcoming and past medical appointments
              </p>
              <span className="appointment-count">
                {appointments.length} appointments
              </span>
            </div>
            {appointments.length > 0 ? (
              <div className="mt-6 space-y-4">
                {appointments.map((appt, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appt.doctor || "Doctor"}</h3>
                        <p className="text-gray-600">
                          {formatDate(appt.date)} at {appt.time}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {appt.purpose || "General Checkup"}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          appt.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appt.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appt.status || "scheduled"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No appointments scheduled yet.</p>
                
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
