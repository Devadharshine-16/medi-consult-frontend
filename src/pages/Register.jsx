import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register", form);
      setMessage("✅ Registration successful!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Error registering");
    }

    setIsLoading(false);
  };

  const messageType = message.startsWith("✅") ? "success" : "error";

  return (
    <div className="auth-page">
      <div className="auth-card glass fade-in-up">
        <div className="auth-header">
          <p className="auth-badge">Join MediCare+</p>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Set up your secure medical profile to book appointments, chat with doctors, and order medicines anytime.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                className="auth-input"
                type="text"
                name="name"
                placeholder="Dr. Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                className="auth-input"
                type="email"
                name="email"
                placeholder="you@medicare.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="auth-input"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                className="auth-input"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create account"}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${messageType}`}>
            {message}
          </p>
        )}

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
