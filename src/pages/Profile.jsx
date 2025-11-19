import { useState, useEffect, useMemo } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Get appointments from localStorage
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // In real app: fetch from backend/localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
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

  const parseAppointmentDate = (appt) => {
    if (!appt?.date) return new Date(0);
    const timePart = appt.time ? appt.time : "09:00";
    return new Date(`${appt.date}T${timePart}`);
  };

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => parseAppointmentDate(a) - parseAppointmentDate(b)
    );
  }, [appointments]);

  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];

    sortedAppointments.forEach((appt) => {
      if (parseAppointmentDate(appt) >= now) {
        upcoming.push(appt);
      } else {
        past.push(appt);
      }
    });

    return {
      upcomingAppointments: upcoming,
      pastAppointments: past.reverse(),
    };
  }, [sortedAppointments]);

  const nextAppointment = upcomingAppointments[0];
  const uniqueDoctors = useMemo(
    () => new Set(appointments.map((appt) => appt.doctor || "Doctor")).size,
    [appointments]
  );

  const appointmentStats = [
    { label: "Upcoming", value: upcomingAppointments.length },
    { label: "Completed", value: pastAppointments.length },
    { label: "Doctors seen", value: uniqueDoctors },
  ];

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
                    <span className="info-value">{user.name || "Not provided"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email || "Not provided"}</span>
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
              <>
                <div className="info-grid mb-8">
                  {appointmentStats.map((stat) => (
                    <div key={stat.label} className="info-item text-center">
                      <span className="info-label">{stat.label}</span>
                      <span className="info-value text-2xl">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {nextAppointment && (
                  <div className="appointment-card mb-8">
                    <div className="appointment-header">
                      <h3>Next appointment</h3>
                      <span className="status-badge upcoming">
                        {nextAppointment.status || "Upcoming"}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <div className="detail-row">
                        <span className="detail-label">Doctor</span>
                        <span className="detail-value">
                          {nextAppointment.doctor || "Doctor"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Date & time</span>
                        <span className="detail-value">
                          {formatDate(nextAppointment.date)} at{" "}
                          {nextAppointment.time || "To be confirmed"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Purpose</span>
                        <span className="detail-value">
                          {nextAppointment.purpose || "General checkup"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Upcoming</h3>
                      <span className="text-sm text-gray-500">
                        {upcomingAppointments.length} scheduled
                      </span>
                    </div>
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appt, index) => (
                          <div
                            key={`upcoming-${index}`}
                            className="border border-gray-100 rounded-lg p-3"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">
                                  {appt.doctor || "Doctor"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(appt.date)} · {appt.time || "TBD"}
                                </p>
                              </div>
                              <span className="text-sm text-green-600 font-semibold">
                                {appt.status || "confirmed"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {appt.purpose || "General checkup"}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-6">
                        No upcoming appointments
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">History</h3>
                      <span className="text-sm text-gray-500">
                        {pastAppointments.length} completed
                      </span>
                    </div>
                    {pastAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {pastAppointments.slice(0, 5).map((appt, index) => (
                          <div
                            key={`past-${index}`}
                            className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">
                                  {appt.doctor || "Doctor"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(appt.date)} · {appt.time || "TBD"}
                                </p>
                              </div>
                              <span className="text-sm text-blue-600 font-semibold">
                                completed
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {appt.purpose || "General checkup"}
                            </p>
                          </div>
                        ))}
                        {pastAppointments.length > 5 && (
                          <p className="text-xs text-gray-500 text-center">
                            Showing last 5 visits
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-6">
                        No past appointments recorded
                      </p>
                    )}
                  </div>
                </div>
              </>
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
