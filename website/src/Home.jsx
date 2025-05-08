import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
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

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <div className="bg-dark bg-opacity-50 p-4 rounded shadow-lg w-75">
          <h1 className="display-5 fw-bold">To Create & Sustain Protected Areas</h1>
          <p className="lead">And to conserve wildlife through innovation and best practices for the equitable benefit of all.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fw-bold">About SFC</h3>
            <p>
              Sarawak Forestry Corporation (SFC) is a statutory body under the Sarawak Government. Our mission is to manage Totally Protected Areas (TPAs) and conserve biodiversity for future generations.
            </p>
            <Link to="/about" className="btn btn-outline-success mt-3">Read More</Link>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="ratio ratio-16x9 rounded shadow-sm overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/LFMCQW4xh1s"
                title="Sarawak Parks Introduction"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Follow Section */}
      <section className="text-white py-5 bg-follow text-center">
        <h4>Follow Us On Facebook</h4>
      </section>

      {/* Footer */}
      <footer className="bg-success text-white pt-4 pb-3 px-3">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h6>CORPORATE OFFICE KUCHING</h6>
            <p className="mb-0">1st & 2nd Floor, Jalan Tapang 93250, Kuching, Sarawak</p>
            <p className="mb-0">Phone: +60 82-123456</p>
            <p className="mb-0">Email: info@sarawakparks.com</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Operating Hours</h6>
            <p className="mb-0">Mon–Thu: 8:00am–5:30pm</p>
            <p className="mb-0">Fri: 8:00am–11:45am & 2:15pm–5:00pm</p>
            <p className="mb-0">Weekends & Holidays: Closed</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <Link to="/parks" className="d-block text-white">Parks</Link>
            <Link to="/wildlife" className="d-block text-white">Wildlife</Link>
            <Link to="/contact" className="d-block text-white">Contact Us</Link>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>© 2025 Sarawak Parks. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default Home;
