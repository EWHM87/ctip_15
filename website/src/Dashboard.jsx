import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth';
import AdminAlertPanel from './AdminAlertPanel'; // 🔔 import the alert panel

function Dashboard() {
  const role = AuthService.getRole(); // 'admin' | 'guide' | 'visitor'

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🏠 Dashboard</h2>
      <p className="text-muted">Welcome! You are logged in as <strong>{role}</strong>.</p>

      {/* Reminder Bar */}
      {role === 'admin' && (
        <div className="alert alert-warning shadow-sm rounded-2">
          ⚠️ <strong>Reminder:</strong> Check for expiring certifications & update training schedules.
        </div>
      )}

      {role === 'guide' && (
  <>
    {/* Profile Banner */}
    <div className="d-flex align-items-center bg-success bg-gradient rounded-3 p-3 mb-4 shadow">
      <img
        src="/avatar-guide.png"
        alt="Avatar"
        style={{ width: 60, height: 60 }}
        className="rounded-circle me-3 border border-white"
      />
      <div>
        <h4 className="text-white mb-1">
          Hi, {AuthService.getName?.() || "Guide"}!
        </h4>
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
  </>
)}

      {/* ADMIN DASHBOARD */}
      {role === 'admin' && (
        <>
          <div className="card shadow-sm rounded-3 mt-4">
            <div className="card-header bg-dark text-white fw-semibold">🛠️ Admin Quick Actions</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <Link to="/manage-guides" className="btn btn-outline-dark">👥 Manage Guides</Link>
              <Link to="/register-guide" className="btn btn-outline-dark">📝 Register Guide</Link>
              <Link to="/schedule-training" className="btn btn-outline-dark">🗓️ Training</Link>
              <Link to="/qualifications" className="btn btn-outline-dark">🎓 Manage Certifications</Link>
            </div>
          </div>

          <div className="card shadow-sm rounded-3 mt-4">
            <div className="card-header bg-primary text-white fw-semibold">📊 Analytics & Tools</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <Link to="/guide-performance" className="btn btn-outline-primary">📈 Guide Performance</Link>
              <Link to="/admin-notify" className="btn btn-outline-primary">📨 Send Notifications</Link>
              <Link to="/guide-activity-log" className="btn btn-outline-primary">📋 Activity Log</Link>
              <Link to="/iot-species-monitor" className="btn btn-outline-primary">🌿 IoT Monitor</Link>
            </div>
          </div>

          <div className="card shadow-sm rounded-3 mt-4">
            <div className="card-header bg-info text-white fw-semibold">🤖 AI & Data Science Features</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <Link to="/ai-training-recommendations" className="btn btn-outline-info">🎯 Personalized Training Suggestions</Link>
              <Link to="/training-quiz-builder" className="btn btn-outline-info">🧠 Build Training Quizzes</Link>
            </div>
          </div>

          <div className="card shadow-sm rounded-3 mt-4 mb-4">
            <div className="card-header bg-success text-white fw-semibold">🌿 Biodiversity AI Tools</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <Link to="/biodiversity-camera" className="btn btn-outline-success">📷 Species Identification Camera</Link>
              <Link to="/species-database" className="btn btn-outline-success">📚 View Species Records</Link>
            </div>
          </div>

          {/* 🔔 Real-Time IoT Alerts Panel */}
          <AdminAlertPanel />
        </>
      )}
    </div>
  );
}

export default Dashboard;  
