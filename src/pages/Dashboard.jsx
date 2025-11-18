import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import UserProfileCard from "../components/UserProfileCard";
import { getUserAppointments } from "../services/appointmentService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 p-6 flex items-center justify-center">
        <div className="text-xl text-blue-600">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">
            Welcome {user?.name || "Guest"} 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Manage your appointments and consult with doctors online.
          </p>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1">
            <UserProfileCard user={user} />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md mt-6 p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate("/appointment-form")}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition flex items-center justify-center"
                >
                  <span className="mr-2">📅</span> Book New Appointment
                </button>
                <button 
                  onClick={() => navigate("/doctors-consultation")}
                  className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded transition flex items-center justify-center"
                >
                  <span className="mr-2">💬</span> Chat with Doctors
                </button>
                <button 
                  onClick={() => navigate("/order-medicine")}
                  className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded transition flex items-center justify-center"
                >
                  <span className="mr-2">💊</span> Order Medicine
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Appointments and Health Stats */}
          <div className="lg:col-span-2">
            {/* Appointments Section */}
            <AppointmentList userId={user?._id} />
            
            {/* Health Stats Section */}
            <div className="bg-white rounded-lg shadow-md mt-6 overflow-hidden">
              <h3 className="text-lg font-semibold p-4 bg-green-50 text-green-700 border-b">
                Your Health Summary
              </h3>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Next Checkup</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Last Visit</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">
                    Your health records are up to date. Remember to keep your appointments and follow your doctor's recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
