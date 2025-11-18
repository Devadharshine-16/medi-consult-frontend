// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorsConsultation from "./pages/DoctorsConsultation";
import BookAppointment from "./pages/BookAppointment";
import Appointment from "./pages/Appointment";
import AppointmentForm from "./pages/AppointmentForm";
import OrderMedicine from "./pages/OrderMedicine";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Contact from "./pages/Contact";


import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors-consultation" element={<DoctorsConsultation />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment-form" element={<AppointmentForm />} />
        <Route path="/order-medicine" element={<OrderMedicine />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
