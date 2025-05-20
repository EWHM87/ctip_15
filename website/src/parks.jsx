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

      {/* Page Content */}
      <div className="parks-container">
        <h1 className="text-center parks-heading mb-4">🏞️ Semenggoh Wildlife Centre</h1>

        <p className="text-center parks-subtext mb-5">
          Just 20km from Kuching, this lush rainforest reserve is famous for its semi-wild orangutans and conservation efforts. Visitors get a rare opportunity to witness orangutans in their natural habitat and explore educational jungle trails.
        </p>

        {/* Photo Gallery */}
        <div className="row g-4 mb-5 parks-gallery">
          <div className="col-md-4">
            <img src="/image/frontgate.jpg" alt="Semenggoh Entrance" className="img-fluid" title="Semenggoh Forest Entrance" />
          </div>
          <div className="col-md-4">
            <img src="/image/orangutan2.jpg" alt="Orangutan in Semenggoh" className="img-fluid" title="Closeup of semi-wild orangutan" />
          </div>
          <div className="col-md-4">
            <img src="/image/museum4.jpg" alt="Forest trail path" className="img-fluid" title="Jungle trails at Semenggoh" />
          </div>
        </div>

        {/* Video Section */}
        <div className="text-center mb-5 parks-video">
          <h4 className="text-success fw-bold mb-3">🎥 Watch: Orangutan Spotting in Semenggoh</h4>
          <div className="ratio ratio-16x9">
            <iframe
              src="/image/orangutan.mp4"
              title="Semenggoh Orangutan Walkthrough"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center parks-footer-link mt-4">
          <p>
            Looking for more? Visit <Link to="/activities">Activities</Link> or learn about our <Link to="/wildlife">Wildlife</Link> stars like Ritchie the orangutan.
          </p>
        </div>
      </div>
    </>
  );
}

export default Parks;
