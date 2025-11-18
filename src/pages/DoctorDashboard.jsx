import { useState, useEffect } from "react";
import "./DoctorDashboard.css"; // Custom CSS for extra polish

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage when dashboard opens
  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  // Update status of appointment
  const updateStatus = (id, newStatus) => {
    const updatedAppointments = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-card">
        <h2 className="dashboard-title">🩺 Doctor Dashboard</h2>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No appointments yet. Patients will appear here after booking.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.name}</td>
                    <td>{apt.email}</td>
                    <td>{apt.doctor}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td className="reason-cell">{apt.reason}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          apt.status === "Pending"
                            ? "status-pending"
                            : apt.status === "Confirmed"
                            ? "status-confirmed"
                            : "status-cancelled"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="actions">
                      {apt.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(apt.id, "Confirmed")}
                            className="action-btn btn-confirm"
                          >
                            ✅ Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, "Cancelled")}
                            className="action-btn btn-cancel"
                          >
                            ❌ Cancel
                          </button>
                        </>
                      )}
                      {apt.status !== "Pending" && (
                        <button
                          onClick={() => updateStatus(apt.id, "Pending")}
                          className="action-btn btn-reset"
                        >
                          🔄 Reset
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
