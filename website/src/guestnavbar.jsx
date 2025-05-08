// src/GuestNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function GuestNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">🌿 Sarawak Parks</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/parks">Parks</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/wildlife">Wildlife</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
          <div>
            <Link to="/login" className="btn btn-light me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-light">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default GuestNavbar;
