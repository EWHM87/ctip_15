import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';


function Sidebar({ role, onLogout }) {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link text-white bg-success rounded px-3 py-2 fw-semibold"
      : "nav-link text-white px-3 py-2";

  // Collapsible states
  const [adminGuideOpen, setAdminGuideOpen] = useState(false);
  const [adminAnalyticsOpen, setAdminAnalyticsOpen] = useState(false);
  const [adminBiodiversityOpen, setAdminBiodiversityOpen] = useState(false);
  const [guideToolsOpen, setGuideToolsOpen] = useState(false);
  const [visitorToolsOpen, setVisitorToolsOpen] = useState(false);

  return (
    <aside className="sidebar">
      <h4 className="text-center mb-4">🌿 Park Guide System</h4>
      <nav>
        <ul className="nav flex-column gap-2">

          {/* GENERAL */}
          <li className="text-uppercase text-white-50 small px-2">🌐 General</li>
          <li><NavLink to="/dashboard" className={navClass}>🏠 Dashboard</NavLink></li>

          {/* GUIDE TOOLS */}
          {(role === 'guide' || role === 'admin') && (
            <>
              <li className="mt-3 text-uppercase text-white-50 small px-2" onClick={() => setGuideToolsOpen(!guideToolsOpen)} style={{ cursor: 'pointer' }}>
                🧭 Guide Tools {guideToolsOpen ? '▾' : '▸'}
              </li>
              {guideToolsOpen && (
                <>
                  <li><NavLink to="/training" className={navClass}>📚 Training</NavLink></li>
                  {role === 'guide' && (
                    <>
                      <li><NavLink to="/my-certifications" className={navClass}>📄 My Certifications</NavLink></li>
                      <li><NavLink to="/notifications" className={navClass}>🔔 Notifications</NavLink></li>
                      <li><NavLink to="/my-training-history" className={navClass}>📋 Training History</NavLink></li>
                      <li><NavLink to="/biodiversity-upload" className={navClass}>📷 Upload Biodiversity</NavLink></li>
                      <li><NavLink to="/guide-assessment" className={navClass}>✅ Self-Assessment</NavLink></li>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {/* VISITOR TOOLS */}
          {role === 'visitor' && (
            <>
              <li className="mt-3 text-uppercase text-white-50 small px-2" onClick={() => setVisitorToolsOpen(!visitorToolsOpen)} style={{ cursor: 'pointer' }}>
                🧭 Explore & Feedback {visitorToolsOpen ? '▾' : '▸'}
              </li>
              {visitorToolsOpen && (
                <>
                  <li><NavLink to="/parks" className={navClass}>🏞️ Explore Parks</NavLink></li>
                  <li><NavLink to="/wildlife" className={navClass}>🐾 View Wildlife</NavLink></li>
                  <li><NavLink to="/activities" className={navClass}>🎯 Activities</NavLink></li>
                  <li><NavLink to="/feedback" className={navClass}>📝 Submit Feedback</NavLink></li>
                </>
              )}
            </>
          )}

          {/* ADMIN TOOLS */}
          {role === 'admin' && (
            <>
              {/* Guide Management */}
              <li className="mt-3 text-uppercase text-white-50 small px-2" onClick={() => setAdminGuideOpen(!adminGuideOpen)} style={{ cursor: 'pointer' }}>
                🛠️ Admin: Guide Management {adminGuideOpen ? '▾' : '▸'}
              </li>
              {adminGuideOpen && (
                <>
                  <li><NavLink to="/manage-guides" className={navClass}>👥 Manage Guides</NavLink></li>
                  <li><NavLink to="/register-guide" className={navClass}>➕ Register Guide</NavLink></li>
                  <li><NavLink to="/qualifications" className={navClass}>🎓 Manage Certifications</NavLink></li>
                  <li><NavLink to="/schedule-training" className={navClass}>🗓️ Schedule Trainings</NavLink></li>
                  <li><NavLink to="/certification-reminders" className={navClass}>⏰ Cert Reminders</NavLink></li>
                </>
              )}

              {/* Analytics & Feedback */}
              <li className="mt-3 text-uppercase text-white-50 small px-2" onClick={() => setAdminAnalyticsOpen(!adminAnalyticsOpen)} style={{ cursor: 'pointer' }}>
                📊 Admin: Analytics & Feedback {adminAnalyticsOpen ? '▾' : '▸'}
              </li>
              {adminAnalyticsOpen && (
                <>
                  <li><NavLink to="/guide-performance" className={navClass}>📈 Guide Performance</NavLink></li>
                  <li><NavLink to="/guide-activity-log" className={navClass}>🧾 Activity Log</NavLink></li>
                  <li><NavLink to="/admin-notify" className={navClass}>📨 Send Notifications</NavLink></li>
                </>
              )}

              {/* Biodiversity */}
              <li className="mt-3 text-uppercase text-white-50 small px-2" onClick={() => setAdminBiodiversityOpen(!adminBiodiversityOpen)} style={{ cursor: 'pointer' }}>
                🌿 Admin: Biodiversity Tools {adminBiodiversityOpen ? '▾' : '▸'}
              </li>
              {adminBiodiversityOpen && (
                <>
                  <li><NavLink to="/iot-species-monitor" className={navClass}>📡 IoT Species Monitor</NavLink></li>
                  <li><NavLink to="/biodiversity-camera" className={navClass}>📷 Species ID Camera</NavLink></li>
                  <li><NavLink to="/species-database" className={navClass}>📚 Species Database</NavLink></li>
                </>
              )}
            </>
          )}

          {/* LOGOUT */}
          <li className="mt-4 pt-2 border-top">
            <button
              className="btn btn-outline-light w-100"
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
