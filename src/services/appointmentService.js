const API_URL = "https://medical-consultation-backend-1.onrender.com/api";

// Get user appointments
export const getUserAppointments = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const response = await fetch(`${API_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  
  return await response.json();
};

// Create new appointment
export const createAppointment = async (appointmentData) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(appointmentData)
  });
  
  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }
  
  return await response.json();
};

// Get appointment details
export const getAppointmentDetails = async (appointmentId) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required");
  }
  
  const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch appointment details");
  }
  
  return await response.json();
};