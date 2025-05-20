import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Using central styles

function Guidebook() {
  return (
    <div>
      {/* Top Navigation */}
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
           {localStorage.getItem('token') && localStorage.getItem('role') === 'visitor' ? (
              <div className="d-flex align-items-center text-white">
                <span className="me-3 fw-semibold">👋 {localStorage.getItem('username')}</span>
                <Link to="/feedback" className="btn btn-outline-light btn-sm me-2">📝 Feedback</Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >Logout</button>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/login" className="btn btn-light me-2">Login</Link>
                <Link to="/register" className="btn btn-outline-light">Register</Link>
              </div>
            )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Guidebook Content */}
      <div className="gb-container py-5">
        <h2 className="text-center mb-4 fw-bold">🗺️ Interactive Digital Guidebook</h2>
        <p className="text-center mb-5 text-muted">
          Navigate Semenggoh Wildlife Centre through maps, videos, and key visitor resources.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/guidebook/map" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">🗺️ Park Map</h5>
                <p className="gb-card-text">View trails, orangutan zones, and ranger checkpoints.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/guidebook/destinations" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">📍 Must-See Spots</h5>
                <p className="gb-card-text">Orangutan feeding decks, nature trails, and towers.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/guidebook/wildlife" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">🦧 Wildlife</h5>
                <p className="gb-card-text">Learn about our orangutans, hornbills, and forest species.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/guidebook/activities" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">🎯 Activities</h5>
                <p className="gb-card-text">Join ranger talks, feeding sessions, and nature walks.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/guidebook/accommodation" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">🏨 Accommodation</h5>
                <p className="gb-card-text">Explore eco-lodges and nearby homestay options.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/guidebook/history" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3">
                <h5 className="gb-card-title">🏛️ Park History</h5>
                <p className="gb-card-text">Discover Semenggoh’s origins and conservation legacy.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-12">
            <Link to="/guidebook/updates" className="text-decoration-none">
              <div className="gb-card card h-100 shadow-sm text-center p-3 bg-warning-subtle">
                <h5 className="gb-card-title">🔔 Real-Time Park Updates</h5>
                <p className="gb-card-text">Check alerts, closure notices, and orangutan sightings.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guidebook;
