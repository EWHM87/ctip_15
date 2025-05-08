import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Wildlife() {
  const wildlifeImage = '/image/wildlife1.jpg'; // From public/image/

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
                <li className="nav-item"><Link className="nav-link active" to="/wildlife">Wildlife</Link></li>
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

      {/* Wildlife Poster Section */}
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-4">
          🌿 Totally Protected Wildlife of Sarawak
        </h2>

        <div className="text-center mb-5">
          <img
            src={wildlifeImage}
            alt="Totally Protected Wildlife Poster"
            className="img-fluid rounded shadow"
            style={{
              maxHeight: '700px',
              maxWidth: '100%',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
          <p className="text-muted mt-3 small">
            Do not hunt, kill, keep, or sell. Penalty: RM50,000 fine and 5 years’ jail.
          </p>
        </div>

        <ul className="list-unstyled text-center fs-5">
          <li>🦧 Orangutans</li>
          <li>🦜 Rhinoceros Hornbills</li>
          <li>🐘 Pygmy Elephants</li>
          <li>🐊 Crocodiles</li>
          <li>🪴 Nepenthes (Pitcher Plants)</li>
        </ul>
      </div>
    </>
  );
}

export default Wildlife;
