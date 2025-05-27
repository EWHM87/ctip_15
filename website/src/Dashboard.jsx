import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth';

// Dummy activity data for illustration (replace with real data as needed)
const recentActivity = [
  { time: '2 mins ago', action: 'Registered for Wildlife Ethics training' },
  { time: '1 day ago', action: 'Uploaded Orangutan photo' },
  { time: '3 days ago', action: 'Completed First Aid certification' },
];

function GuideDashboard() {
  const guideName = AuthService.getName?.() || 'Guide';

  return (
    <div className="container mt-4">
      {/* Profile Banner */}
      <div className="d-flex align-items-center bg-success bg-gradient rounded-3 p-3 mb-4 shadow">
        <img
          src="/avatar-guide.png"
          alt="Avatar"
          style={{ width: 60, height: 60 }}
          className="rounded-circle me-3 border border-white"
        />
        <div>
          <h4 className="text-white mb-1">Hi, {guideName}!</h4>
          <div className="text-light">Ready for your next adventure?</div>
        </div>
      </div>

      {/* Enhanced Notice */}
      <div className="alert alert-info d-flex align-items-center shadow-sm rounded-2 mb-4">
        <span style={{ fontSize: 32, marginRight: 15 }}>🦧</span>
        <div>
          <b>Upcoming Training:</b> <em>“Wildlife Ethics”</em> starts <b>June 10, 2024</b>.
          <Link to="/training" className="btn btn-success btn-sm ms-3">
            Register Now
          </Link>
        </div>
      </div>

      {/* Shortcut Cards (Grid Style) */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-6">
          <Link to="/training" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>📚</div>
                <div className="fw-bold mt-2">Sign Up for Training</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/my-certifications" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>📄</div>
                <div className="fw-bold mt-2">My Certifications</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/notifications" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>🔔</div>
                <div className="fw-bold mt-2">Notifications</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/my-training-history" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>📋</div>
                <div className="fw-bold mt-2">Training History</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/certification-reminders" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>⏰</div>
                <div className="fw-bold mt-2">Certification Reminders</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/biodiversity-camera" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>📷</div>
                <div className="fw-bold mt-2">Upload Species</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4 col-6">
          <Link to="/guide-assessment" className="text-decoration-none">
            <div className="card h-100 text-center shadow-sm border-success">
              <div className="card-body">
                <div style={{ fontSize: 30 }}>✅</div>
                <div className="fw-bold mt-2">Self-Assessment</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Optional: Recent Activity Feed */}
      <div className="card mt-4 shadow-sm rounded-3">
        <div className="card-header bg-light fw-semibold">Recent Activity</div>
        <ul className="list-group list-group-flush">
          {recentActivity.map((item, idx) => (
            <li className="list-group-item" key={idx}>
              <span className="text-muted small">{item.time}:</span> {item.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuideDashboard;
