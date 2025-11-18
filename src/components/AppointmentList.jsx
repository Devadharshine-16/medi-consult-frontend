import { useState, useEffect } from "react";

function AppointmentList({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("Authentication required");
        }
        
        const response = await fetch("https://medical-consultation-backend-1.onrender.com/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-blue-600">You don't have any appointments yet.</p>
        <button 
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          onClick={() => window.location.href = "/appointment-form"}
        >
          Book an Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold p-4 bg-blue-50 text-blue-700 border-b">
        Your Appointments
      </h3>
      <div className="divide-y">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="p-4 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">
                  Dr. {appointment.doctor.name}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.doctor.specialization}
                </p>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  appointment.status === "confirmed" 
                    ? "bg-green-100 text-green-800" 
                    : appointment.status === "completed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
            <p className="text-sm mt-2">
              <span className="text-gray-600">Date: </span>
              {new Date(appointment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentList;