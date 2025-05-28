import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import './App.css';

const center = { lat: 1.3614, lng: 110.2641 }; // Semenggoh Wildlife Centre

const points = [
  {
    position: { lat: 1.3614, lng: 110.2641 },
    title: 'Main Entrance',
    description: 'Welcome to Semenggoh Wildlife Centre. Ticket counter and visitor info available here.',
  },
  {
    position: { lat: 1.3626, lng: 110.2665 },
    title: 'Orangutan Feeding Area',
    description: 'Feeding sessions happen at 9am and 3pm daily (subject to sightings).',
  },
  {
    position: { lat: 1.3619, lng: 110.2678 },
    title: 'Nature Trail Start',
    description: 'Explore the rainforest on a self-guided walk through the main loop trail.',
  },
  {
    position: { lat: 1.3632, lng: 110.2687 },
    title: 'Observation Deck',
    description: 'Watch for hornbills and gibbons in the canopy from this scenic viewing point.',
  },
];

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '10px',
};

function InteractiveMap() {
  const [selected, setSelected] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAq04RxqQ4I0u8dzZORqzO9xV4KZXCVp8A', // ← replace with your real key
  });

  if (!isLoaded) return <div>Loading Map...</div>;

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
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">🗺️ Semenggoh Park Map</h2>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        >
          {points.map((p, idx) => (
            <Marker
              key={idx}
              position={p.position}
              onClick={() => setSelected(p)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={selected.position}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <h6>{selected.title}</h6>
                <p className="mb-0">{selected.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default InteractiveMap;
