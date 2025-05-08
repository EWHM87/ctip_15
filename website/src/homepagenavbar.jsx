import React from 'react';
import { Link } from 'react-router-dom';

function PublicNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home">🌿 Sarawak Parks</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
            <li className="nav-item"><a className="nav-link" href="#parks">Parks</a></li>
            <li className="nav-item"><a className="nav-link" href="#wildlife">Wildlife</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
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

export default PublicNavbar;
