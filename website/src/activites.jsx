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
            <Link className="navbar-brand fw-bold" to="/">🦧 Semenggoh Wildlife Centre</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/parks">Park Info</Link></li>
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
        <h2 className="text-center text-success fw-bold mb-4">🎯 Activities at Semenggoh Wildlife Centre</h2>
        <p className="text-center text-muted mb-5">
          Whether you're an animal lover, photographer, or nature walker — Semenggoh has something wild for you.
        </p>

        <div className="row g-4">
          {/* Orangutan Feeding Sessions */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="text-success fw-bold">🦧 Orangutan Feeding</h5>
                <p className="text-muted">
                  Watch rehabilitated orangutans roam semi-wild during daily feeding times at 9:00 AM and 3:00 PM. Rangers provide briefings and manage safe distances.
                </p>
              </div>
            </div>
          </div>

          {/* Ranger Educational Talks */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="text-success fw-bold">🎤 Ranger Briefings</h5>
                <p className="text-muted">
                  Learn about orangutan behavior, forest conservation, and Semenggoh’s history directly from the expert staff who care for the animals.
                </p>
              </div>
            </div>
          </div>

          {/* Nature Trails */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="text-success fw-bold">🌿 Jungle Walks</h5>
                <p className="text-muted">
                  Explore shaded rainforest trails with interpretive signboards. Spot birds, insects, and learn about Borneo's native flora on a self-guided trek.
                </p>
              </div>
            </div>
          </div>

          {/* Birdwatching */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="text-success fw-bold">🦜 Birdwatching</h5>
                <p className="text-muted">
                  Bring binoculars! Early morning visits often reward guests with views of hornbills, kingfishers, and leafbirds flying above the canopy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-5">
          <p className="text-muted small">
            Activities may vary depending on weather, season, and orangutan presence. Check updates on the <Link to="/guidebook/updates">Park Updates</Link> page.
          </p>
        </div>
      </div>
    </>
  );
}

export default Activities;
