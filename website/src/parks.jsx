import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Parks() {
  return (
    <>
      {/* Header Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">🌿 Sarawak Parks</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link active" to="/parks">Parks</Link></li>
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

      {/* Main Section */}
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-4">🏞️ Semenggoh Wildlife Centre</h2>

        <p className="lead text-center mb-4">
          Located just 20km from Kuching, Semenggoh Wildlife Centre is a premier destination to see semi-wild orangutans in their natural rainforest habitat.
          The centre is part of Sarawak’s effort to rehabilitate rescued orangutans and return them to the wild.
        </p>

        {/* Gallery Section */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <img src="/image/frontgate.jpg" alt="Semenggoh Forest" className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-4">
            <img src="/image/orangutan2.jpg" alt="Orangutan Closeup" className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-4">
            <img src="/image/museum4.jpg" alt="Semenggoh Trail" className="img-fluid rounded shadow-sm" />
          </div>
        </div>

        {/* Embedded Video */}
        <div className="text-center mb-5">
          <h5 className="text-success mb-3">🎥 Experience Semenggoh</h5>
          <div className="ratio ratio-16x9 rounded shadow-sm">
            <iframe
              src="/image/orangutan.mp4" // Replace with your desired video URL
              title="Semenggoh Orangutans"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Explore More */}
        <div className="text-center">
          <p className="text-muted">
            Want to explore more? Visit <Link to="/activities">Activities</Link> or <Link to="/wildlife">Wildlife</Link> to discover park adventures.
          </p>
        </div>
      </div>
    </>
  );
}

export default Parks;
