import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth';

function Dashboard() {
  const role = AuthService.getRole();

  return (
    <div className="container mt-4">
      <h2>🏠 Dashboard</h2>
      <p>Welcome! You are logged in as <strong>{role}</strong>.</p>

      {/* Guide View */}
      {role === 'guide' && (
        <>
          <div className="alert alert-info mt-4">
            📢 <strong>Notice:</strong> New training on <em>“Wildlife Ethics”</em> starts <strong>June 10, 2024</strong>.
            <br />
            Visit the <Link to="/training">Training</Link> section to register.
          </div>

          <section className="mt-4">
            <h5>📄 Guide Portal</h5>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/training" className="btn btn-outline-success">📚 Sign Up for Training</Link>
              <Link to="/my-certifications" className="btn btn-outline-success">📄 My Certifications</Link>
              <Link to="/notifications" className="btn btn-outline-success">🔔 Notifications</Link>
              <Link to="/my-training-history" className="btn btn-outline-success">📋 Training History</Link>
              <Link to="/biodiversity-upload" className="btn btn-outline-success">📷 Upload Species</Link>
              <Link to="/feedback" className="btn btn-outline-secondary">📝 Submit Feedback</Link>
            </div>
          </section>
        </>
      )}

      {/* Visitor View */}
      {role === 'visitor' && (
        <>
          <section className="mt-4">
            <h5>🌳 Visitor Portal</h5>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/parks" className="btn btn-outline-success">🏞️ Explore Parks</Link>
              <Link to="/wildlife" className="btn btn-outline-success">🐾 View Wildlife</Link>
              <Link to="/activities" className="btn btn-outline-success">🎯 Activities</Link>
              <Link to="/feedback" className="btn btn-outline-secondary">📝 Submit Feedback</Link>
            </div>
          </section>
        </>
      )}

      {/* Admin View */}
      {role === 'admin' && (
        <>
          <div className="alert alert-warning mt-4">
            ⚠️ <strong>Reminder:</strong> Check for expiring certifications & update training schedules.
          </div>

          <section className="mt-4">
            <h5>🛠️ Admin Quick Actions</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <Link to="/manage-guides" className="btn btn-outline-dark">Manage Guides</Link>
              <Link to="/register-guide" className="btn btn-outline-dark">Register Guide</Link>
              <Link to="/schedule-training" className="btn btn-outline-dark">Schedule Training</Link>
              <Link to="/certification-reminders" className="btn btn-outline-dark">Certification Reminders</Link>
              <Link to="/qualifications" className="btn btn-outline-dark">Manage Certifications</Link>
            </div>

            <h5>📊 Analytics & Tools</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <Link to="/guide-performance" className="btn btn-outline-primary">📊 Guide Performance</Link>
              <Link to="/admin-notify" className="btn btn-outline-primary">📨 Send Notifications</Link>
              <Link to="/guide-activity-log" className="btn btn-outline-primary">🧾 Activity Log</Link>
              <Link to="/iot-species-monitor" className="btn btn-outline-primary">🌿 IoT Monitor</Link>
            </div>

            <h5>🤖 AI & Data Science Features</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <Link to="/feedback-review" className="btn btn-outline-info">📝 Visitor Feedback Review</Link>
              <Link to="/ai-training-recommendations" className="btn btn-outline-info">🎯 Personalized Training Suggestions</Link>
              <Link to="/training-quiz-builder" className="btn btn-outline-info">🧠 Build Training Quizzes</Link>
            </div>

            <h5>🌿 Biodiversity AI Tools</h5>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/biodiversity-camera" className="btn btn-outline-success">📷 Species Identification Camera</Link>
              <Link to="/species-database" className="btn btn-outline-success">📚 View Species Records</Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
