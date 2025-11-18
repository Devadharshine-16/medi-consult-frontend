import axios from "axios";

const API = axios.create({
  baseURL: "https://medical-consultation-backend-1.onrender.com/api", // Production backend
});

// Attach token to requests if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
