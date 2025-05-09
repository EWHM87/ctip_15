import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ role, onLogout }) {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive ? "nav-link text-white bg-success rounded px-3 py-2 fw-semibold" : "nav-link text-white px-3 py-2";

  return (
    <aside className="sidebar">
      <h4 className="text-center mb-4">🌿 Park Guide System</h4>
      <nav>
        <ul className="nav flex-column gap-2">

          {/* 📁 GENERAL */}
          <li className="text-uppercase text-white-50 small px-2">General</li>
          <li><NavLink to="/home" className={navClass}>🏞️ Home</NavLink></li>
          <li><NavLink to="/dashboard" className={navClass}>🏠 Dashboard</NavLink></li>
          <li><NavLink to="/park-info" className={navClass}>🌲 Park Info</NavLink></li>

          {/* 📁 GUIDE TOOLS */}
          {(role === 'guide' || role === 'admin') && (
            <>
              <li className="mt-3 text-uppercase text-white-50 small px-2">Guide Tools</li>
              <li><NavLink to="/training" className={navClass}>📚 Training</NavLink></li>
            </>
          )}

          {role === 'guide' && (
            <>
              <li><NavLink to="/my-certifications" className={navClass}>📄 My Certifications</NavLink></li>
              <li><NavLink to="/notifications" className={navClass}>🔔 Notifications</NavLink></li>
              <li><NavLink to="/my-training-history" className={navClass}>📋 Training History</NavLink></li>
              <li><NavLink to="/biodiversity-upload" className={navClass}>📷 Biodiversity Upload</NavLink></li>
              <li><NavLink to="/feedback" className={navClass}>📝 Submit Feedback</NavLink></li>
            </>
          )}

          {/* 📁 VISITOR TOOLS */}
          {role === 'visitor' && (
            <>
              <li className="mt-3 text-uppercase text-white-50 small px-2">Visitor Tools</li>
              <li><NavLink to="/parks" className={navClass}>🏞️ Explore Parks</NavLink></li>
              <li><NavLink to="/wildlife" className={navClass}>🐾 View Wildlife</NavLink></li>
              <li><NavLink to="/activities" className={navClass}>🎯 Activities</NavLink></li>
              <li><NavLink to="/feedback" className={navClass}>📝 Submit Feedback</NavLink></li>
            </>
          )}

          {/* 📁 ADMIN TOOLS */}
          {role === 'admin' && (
            <>
              <li className="mt-3 text-uppercase text-white-50 small px-2">Admin Tools</li>
              <li><NavLink to="/manage-guides" className={navClass}>👥 Manage Guides</NavLink></li>
              <li><NavLink to="/register-guide" className={navClass}>➕ Register Guide</NavLink></li>
              <li><NavLink to="/qualifications" className={navClass}>🎓 Guide Certifications</NavLink></li>
              <li><NavLink to="/schedule-training" className={navClass}>🗓️ Training Schedules</NavLink></li>
              <li><NavLink to="/certification-reminders" className={navClass}>⏰ Cert Reminders</NavLink></li>
              <li><NavLink to="/guide-performance" className={navClass}>📊 Guide Performance</NavLink></li>
              <li><NavLink to="/guide-activity-log" className={navClass}>🧾 Activity Log</NavLink></li>
              <li><NavLink to="/iot-species-monitor" className={navClass}>🌿 IoT Monitor</NavLink></li>
              <li><NavLink to="/admin-notify" className={navClass}>📨 Send Notification</NavLink></li>
            </>
          )}

          {/* 🚪 LOGOUT */}
          <li className="mt-4">
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
