import React from 'react';
import './App.css';
import { Link, NavLink } from 'react-router-dom';

function Destinations() {
  const spots = [
    {
      title: '🦧 Orangutan Feeding Platform',
      image: '/image/feeding-deck.jpg',
      description: 'This is where semi-wild orangutans are often seen during the 9AM and 3PM feeding sessions. Please remain silent and follow ranger instructions.',
    },
    {
      title: '🌳 Main Rainforest Trail',
      image: '/image/rainforest-trail.jpg',
      description: 'A scenic trail that loops through the heart of the Semenggoh Reserve. Suitable for all ages. Watch for hornbills and gibbons overhead.',
    },
    {
      title: '🔭 Observation Tower',
      image: '/image/viewing-tower.jpg',
      description: 'Climb up to get a panoramic view of the forest canopy and spot wildlife from above. Great photo opportunity spot!',
    }
  ];

  return (
    <div>
      {/* Header Navigation */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">🦧 Semenggoh Wildlife Centre</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item"><NavLink to="/about" className="nav-link">About</NavLink></li>
                <li className="nav-item"><NavLink to="/parks" className="nav-link">Park Info</NavLink></li>
                <li className="nav-item"><NavLink to="/wildlife" className="nav-link">Wildlife</NavLink></li>
                <li className="nav-item"><NavLink to="/activities" className="nav-link">Activities</NavLink></li>
                <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
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
      <div className="gb-dest-container container py-5">
        <h2 className="text-center fw-bold text-success mb-4">📍 Must-See Spots in Semenggoh</h2>
        <p className="text-center text-muted mb-5">
          Explore the most iconic visitor locations within the park. These destinations offer the best wildlife encounters and scenic experiences.
        </p>

        <div className="row g-4">
          {spots.map((spot, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 gb-dest-card">
                <img src={spot.image} alt={spot.title} className="card-img-top gb-dest-img" />
                <div className="card-body">
                  <h5 className="fw-bold">{spot.title}</h5>
                  <p className="text-muted">{spot.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;
