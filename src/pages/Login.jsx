import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setMessage("❌ Invalid email or password");
    }

    setIsLoading(false);
  };

  const messageType = message.startsWith("✅") ? "success" : "error";

  return (
    <div className="auth-page">
      <div className="auth-card glass fade-in-up">
        <div className="auth-header">
          <p className="auth-badge">Welcome Back</p>
          <h2 className="auth-title">Sign in to MediCare+</h2>
          <p className="auth-subtitle">
            Manage appointments, continue consultations, and keep track of prescriptions in one secure place.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@medicare.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign in"}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${messageType}`}>
            {message}
          </p>
        )}

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
