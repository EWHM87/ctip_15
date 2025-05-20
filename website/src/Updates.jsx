import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './App.css';

function Updates() {
  const updates = [
    {
      time: 'Today, 8:45 AM',
      type: 'info',
      message: '🦧 Orangutan Ritchie spotted near the feeding platform!'
    },
    {
      time: 'Today, 7:30 AM',
      type: 'warning',
      message: '⚠️ Wet trails ahead. Use caution when walking the forest loop.'
    },
    {
      time: 'Yesterday, 3:15 PM',
      type: 'danger',
      message: '🚫 Observation Tower temporarily closed for maintenance.'
    },
    {
      time: '2 days ago',
      type: 'success',
      message: '✅ Trail cleanup complete. Nature Walk reopened to visitors.'
    }
  ];

  return (
    <div>
      {/* Navigation Header */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">🦧 Semenggoh Wildlife Centre</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/parks">Park Info</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/guidebook">Guidebook</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/wildlife">Wildlife</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              </ul>
              <div className="d-flex">
                <Link to="/login" className="btn btn-light me-2">Login</Link>
                <Link to="/register" className="btn btn-outline-light">Register</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="gb-updates container py-5">
        <h2 className="text-center fw-bold text-success mb-4">🔔 Park Updates & Notices</h2>
        <p className="text-center text-muted mb-5">Stay informed about Semenggoh Wildlife Centre’s latest happenings.</p>

        <div className="list-group">
          {updates.map((item, idx) => (
            <div key={idx} className={`list-group-item list-group-item-${item.type}`}>
              <strong>{item.time}:</strong> {item.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Updates;
