import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Required for navbar
import './App.css';

function Accommodation() {
  const stays = [
    {
      name: 'Semenggoh Rainforest Lodge',
      type: 'Eco-Lodge',
      image: '/image/lodge.jpg',
      distance: 'Inside Semenggoh Park',
      price: 'RM180/night',
      description: 'Stay close to nature with basic yet comfortable rainforest lodges near the orangutan zones.'
    },
    {
      name: 'Borneo Highlands Resort',
      type: 'Resort',
      image: '/image/resort.jpg',
      distance: '15 mins from Semenggoh',
      price: 'RM320/night',
      description: 'A peaceful getaway with spa, jungle treks, and mountain views. Ideal for eco-tourists and families.'
    },
    {
      name: 'Kuching Homestay @ Padawan',
      type: 'Homestay',
      image: '/image/padawan.jpg',
      distance: '10 mins from Semenggoh',
      price: 'RM100/night',
      description: 'Local homestay hosted by friendly families. Great for cultural experience and affordable lodging.'
    }
  ];

  return (
    <div>
      {/* Navbar */}
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

      {/* Main Content */}
      <main className="gb-accom-container container py-5">
        <h2 className="text-center text-success fw-bold mb-4">🏨 Stay Near Semenggoh Wildlife Centre</h2>
        <p className="text-center text-muted mb-5">
          Explore nearby eco-lodges, resorts, and homestays for every kind of traveler.
        </p>

        <div className="row g-4">
          {stays.map((place, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 gb-accom-card">
                <img src={place.image} alt={place.name} className="card-img-top gb-accom-img" />
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <h5 className="fw-bold mb-1">{place.name}</h5>
                    <p className="text-muted small">{place.type} · {place.distance}</p>
                  </div>
                  <p className="text-muted flex-grow-1">{place.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold text-success">{place.price}</span>
                    <button className="btn btn-outline-success btn-sm">🔎 View Details</button>
                  </div>
                  <button className="btn btn-success w-100 mt-2">🛏️ Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Accommodation;
