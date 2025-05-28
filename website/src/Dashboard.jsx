import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth';
import AdminAlertPanel from './AdminAlertPanel';

function Dashboard() {
  const role = AuthService.getRole(); // 'admin' | 'guide' | 'visitor'

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🏠 Dashboard</h2>
      <p className="text-muted">Welcome! You are logged in as <strong>{role}</strong>.</p>

      {/* Reminder Bar for Admin */}
      {role === 'admin' && (
        <div className="alert alert-warning shadow-sm rounded-2 mb-4">
          ⚠️ <strong>Reminder:</strong> Check for expiring certifications & update training schedules.
        </div>
      )}

      {/* Guide Dashboard */}
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

          {/* Shortcut Cards */}
          <div className="row g-3 mb-4">
            {/* ... guide cards unchanged ... */}
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
            {/* Add other cards here as in your original guide dashboard */}
          </div>
        </>
      )}

      {/* Enhanced Admin Dashboard */}
      {role === 'admin' && (
        <>
          {/* Profile Banner */}
          <div className="d-flex align-items-center bg-primary bg-gradient rounded-3 p-3 mb-4 shadow">
            <img
              src="/avatar-admin.png"
              alt="Admin Avatar"
              style={{ width: 60, height: 60 }}
              className="rounded-circle me-3 border border-white"
            />
            <div>
              <h4 className="text-white mb-1">
                Hello, {AuthService.getName?.() || "Admin"}!
              </h4>
              <div className="text-light">Manage your park guides and analytics here.</div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="alert alert-info d-flex align-items-center shadow-sm rounded-2 mb-4">
            <span style={{ fontSize: 32, marginRight: 15 }}>⚙️</span>
            <div>
              <b>System Update:</b> Scheduled maintenance on <b>July 15, 2024</b>.
              <Link to="/admin-notify" className="btn btn-primary btn-sm ms-3">
                Notify Users
              </Link>
            </div>
          </div>

          {/* Shortcut Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-4 col-6">
              <Link to="/manage-guides" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>👥</div>
                    <div className="fw-bold mt-2">Manage Guides</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/register-guide" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📝</div>
                    <div className="fw-bold mt-2">Register Guide</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/schedule-training" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>🗓️</div>
                    <div className="fw-bold mt-2">Training</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/qualifications" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>🎓</div>
                    <div className="fw-bold mt-2">Manage Certifications</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/guide-performance" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📈</div>
                    <div className="fw-bold mt-2">Guide Performance</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/admin-notify" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📨</div>
                    <div className="fw-bold mt-2">Send Notifications</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/guide-activity-log" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📋</div>
                    <div className="fw-bold mt-2">Activity Log</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/iot-species-monitor" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>🌿</div>
                    <div className="fw-bold mt-2">IoT Monitor</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/ai-training-recommendations" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>🎯</div>
                    <div className="fw-bold mt-2">Training Suggestions</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/training-quiz-builder" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>🧠</div>
                    <div className="fw-bold mt-2">Build Training Quizzes</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/biodiversity-camera" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📷</div>
                    <div className="fw-bold mt-2">Species Camera</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6">
              <Link to="/species-database" className="text-decoration-none">
                <div className="card h-100 text-center shadow-sm border-primary">
                  <div className="card-body">
                    <div style={{ fontSize: 30 }}>📚</div>
                    <div className="fw-bold mt-2">Species Records</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Real-Time IoT Alerts Panel */}
          <AdminAlertPanel />
        </>
      )}
    </div>
  );
}

export default Dashboard;
