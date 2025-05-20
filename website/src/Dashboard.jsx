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

      {/* GUIDE DASHBOARD */}
      {role === 'guide' && (
        <>
          <div className="alert alert-info shadow-sm rounded-2">
            📢 <strong>Notice:</strong> New training on <em>“Wildlife Ethics”</em> starts <strong>June 10, 2024</strong>.
            <br />
            Visit the <Link to="/training">Training</Link> section to register.
          </div>

          <div className="card shadow-sm rounded-3 mt-4">
            <div className="card-header bg-success text-white fw-semibold">📄 Guide Portal</div>
            <div className="card-body d-flex flex-wrap gap-3">
              <Link to="/training" className="btn btn-outline-success">📚 Sign Up for Training</Link>
              <Link to="/my-certifications" className="btn btn-outline-success">📄 My Certifications</Link>
              <Link to="/notifications" className="btn btn-outline-success">🔔 Notifications</Link>
              <Link to="/my-training-history" className="btn btn-outline-success">📋 Training History</Link>
              <Link to="/certification-reminders" className="btn btn-outline-dark">⏰ Certification Reminders</Link>
              <Link to="/biodiversity-camera" className="btn btn-outline-success">📷 Upload Species</Link>
              <Link to="/guide-assessment" className="btn btn-outline-secondary">✅ Self-Assessment</Link>
            </div>
          </div>
        </>
      )}

      {/* VISITOR DASHBOARD */}
      {role === 'visitor' && (
        <div className="card shadow-sm rounded-3 mt-4">
          <div className="card-header bg-primary text-white fw-semibold">🌳 Visitor Portal</div>
          <div className="card-body d-flex flex-wrap gap-3">
            <Link to="/parks" className="btn btn-outline-primary">🏞️ Explore Parks</Link>
            <Link to="/wildlife" className="btn btn-outline-primary">🐾 View Wildlife</Link>
            <Link to="/activities" className="btn btn-outline-primary">🎯 Activities</Link>
            <Link to="/feedback" className="btn btn-outline-secondary">📝 Submit Feedback</Link>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {role === 'admin' && (
        <>
          <div className="card shadow-sm rounded-3 mt-4">
            <div className="card-header bg-dark text-white fw-semibold">🛠️ Admin Quick Actions</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <Link to="/manage-guides" className="btn btn-outline-dark">👥 Manage Guides</Link>
              <Link to="/register-guide" className="btn btn-outline-dark">📝 Register Guide</Link>
              <Link to="/schedule-training" className="btn btn-outline-dark">🗓️ Schedule Training</Link>
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
