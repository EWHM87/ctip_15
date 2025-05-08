import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Activities() {
  return (
    <>
      {/* Top Navigation */}
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
                <li className="nav-item"><Link className="nav-link" to="/parks">Parks</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/wildlife">Wildlife</Link></li>
                <li className="nav-item"><Link className="nav-link active" to="/activities">Activities</Link></li>
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

      {/* Main Content */}
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-5">🌄 Activities & Accommodation</h2>

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">🎯 Popular Activities</h5>
                <ul className="mb-0">
                  <li>🧭 Guided Jungle Treks</li>
                  <li>🦜 Birdwatching at dawn</li>
                  <li>🌌 Night Safari Walks</li>
                  <li>🛶 Kayaking along rainforest rivers</li>
                  <li>📚 Forest Education Workshops</li>
                  <li>📷 Wildlife Photography Tours</li>
                  <li>🚲 Eco-friendly Cycling Routes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">🏡 Accommodation Options</h5>
                <ul className="mb-0">
                  <li>🌿 <strong>Mulu Rainforest Lodge</strong> – riverside eco-cabins</li>
                  <li>🏕️ <strong>Niah National Park Campground</strong> – tent camping with facilities</li>
                  <li>🌲 <strong>Lambir Forest Chalet</strong> – affordable in-park housing</li>
                  <li>🛏️ <strong>Bako Park Resthouse</strong> – basic shared rooms</li>
                  <li>📍 Nearby homestays with local communities</li>
                </ul>
                <p className="text-muted mt-3 small">
                  Book online via Sarawak Parks or inquire at visitor centers. Early booking is recommended during peak seasons.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted">
            Looking for more? Visit the park's visitor counter or explore <Link to="/parks">our parks</Link> page to plan your stay!
          </p>
        </div>
      </div>
    </>
  );
}

export default Activities;
