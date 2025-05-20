import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import { Link, NavLink } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function InteractiveMap() {
  const center = [1.3614, 110.2641]; // Semenggoh Wildlife Centre

  const points = [
    {
      position: [1.3614, 110.2641],
      title: 'Main Entrance',
      description: 'Welcome to Semenggoh Wildlife Centre. Ticket counter and visitor info available here.',
    },
    {
      position: [1.3626, 110.2665],
      title: 'Orangutan Feeding Area',
      description: 'Feeding sessions happen at 9am and 3pm daily (subject to sightings).',
    },
    {
      position: [1.3619, 110.2678],
      title: 'Nature Trail Start',
      description: 'Explore the rainforest on a self-guided walk through the main loop trail.',
    },
    {
      position: [1.3632, 110.2687],
      title: 'Observation Deck',
      description: 'Watch for hornbills and gibbons in the canopy from this scenic viewing point.',
    },
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

      {/* Map Section */}
      <div className="gb-map-container">
        <h2 className="text-center fw-bold mb-4">🗺️ Semenggoh Park Map</h2>
        <MapContainer center={center} zoom={17} scrollWheelZoom={false} className="gb-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map((p, idx) => (
            <Marker position={p.position} key={idx}>
              <Popup>
                <strong>{p.title}</strong><br />
                {p.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default InteractiveMap;
