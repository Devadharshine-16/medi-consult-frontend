import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiMessageSquare, FiPackage, FiPlus } from "react-icons/fi";
import AppointmentList from "../components/AppointmentList";
import UserProfileCard from "../components/UserProfileCard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (parseError) {
            localStorage.removeItem("user");
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (err) {
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const dashboardDate = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const nextCheckup = useMemo(
    () =>
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    []
  );

  const lastVisit = useMemo(
    () =>
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    []
  );

  const quickActions = [
    {
      icon: <FiCalendar />,
      label: "Book Appointment",
      description: "Schedule or reschedule your next visit",
      variant: "sky",
      onClick: () => navigate("/appointment-form"),
    },
    {
      icon: <FiMessageSquare />,
      label: "Chat with Doctors",
      description: "Start a secure conversation instantly",
      variant: "emerald",
      onClick: () => navigate("/doctors-consultation"),
    },
    {
      icon: <FiPackage />,
      label: "Order Medicine",
      description: "Upload prescription & get doorstep delivery",
      variant: "violet",
      onClick: () => navigate("/order-medicine"),
    },
  ];

  const healthHighlights = [
    {
      title: "Next Checkup",
      value: nextCheckup,
      label: "Confirmed with primary physician",
      variant: "sky",
      icon: <FiCalendar />,
    },
    {
      title: "Last Visit",
      value: lastVisit,
      label: "General consultation",
      variant: "emerald",
      icon: <FiClock />,
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-state">
        <div className="dashboard-state-card glass">
          <div className="dashboard-state-icon loading"></div>
          <p>Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-state">
        <div className="dashboard-state-card glass">
          <div className="dashboard-state-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="auth-button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-state">
        <div className="dashboard-state-card glass">
          <div className="dashboard-state-icon">🔐</div>
          <h2>Sign in required</h2>
          <p>Please log in to view your health dashboard</p>
          <button className="auth-button" onClick={() => navigate("/login")}>
            Go to login
          </button>
        </div>
      </div>
    );
  }

  const friendlyName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="dashboard-page">
      <header className="dashboard-hero glass">
        <div className="dashboard-hero-content">
          <div>
            <p className="dashboard-chip">
              <FiPlus />
              {user?.role === "doctor" ? "Doctor Account" : "Patient Account"}
            </p>
            <h1>Welcome back, {friendlyName} 👋</h1>
            <p className="dashboard-subtitle">
              Here’s what’s happening across your care journey today.
            </p>
          </div>
          <div className="dashboard-date">
            <span>Today</span>
            <strong>{dashboardDate}</strong>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <section className="dashboard-column">
            <div className="dashboard-card glass">
              <UserProfileCard user={user} />
            </div>

              <div className="dashboard-card glass">
                <div className="dashboard-card-header">
                  <div>
                    <p className="dashboard-eyebrow">Priorities</p>
                    <h3>Quick actions</h3>
                  </div>
                  <span className="dashboard-pill">Always available</span>
                </div>
                <div className="dashboard-actions">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      className="dashboard-action"
                      data-variant={action.variant}
                      onClick={action.onClick}
                    >
                      <span className="dashboard-action-icon">{action.icon}</span>
                      <div>
                        <p>{action.label}</p>
                        <small>{action.description}</small>
                      </div>
                      <div className="dashboard-action-caret">→</div>
                    </button>
                  ))}
                </div>
              </div>
          </section>

          <section className="dashboard-column wide">
            <div className="dashboard-card glass">
              <div className="dashboard-card-header">
                <div>
                  <p className="dashboard-eyebrow">Schedule</p>
                  <h3>Upcoming appointments</h3>
                </div>
                <button className="dashboard-link" onClick={() => navigate("/appointment-form")}>
                  New appointment
                </button>
              </div>
              <div className="dashboard-card-body">
                <AppointmentList userId={user?._id} />
              </div>
            </div>

            <div className="dashboard-card glass">
              <div className="dashboard-card-header">
                <div>
                  <p className="dashboard-eyebrow">Insights</p>
                  <h3>Health summary</h3>
                </div>
                <span className="dashboard-pill secondary">Auto-updates daily</span>
              </div>
              <div className="dashboard-summary">
                {healthHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="dashboard-summary-card"
                    data-variant={item.variant}
                  >
                    <span className="dashboard-summary-icon">{item.icon}</span>
                    <div>
                      <p>{item.title}</p>
                      <strong>{item.value}</strong>
                      <small>{item.label}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

