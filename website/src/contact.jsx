import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Contact() {
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
                <li className="nav-item"><Link className="nav-link" to="/parks">Parks</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/wildlife">Wildlife</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link active" to="/contact">Contact</Link></li>
              </ul>
              <div className="d-flex">
                <Link to="/login" className="btn btn-light me-2">Login</Link>
                <Link to="/register" className="btn btn-outline-light">Register</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Contact Page Content */}
      <div className="container py-5">
        <h2 className="text-center text-success fw-bold mb-4">📍 Contact Semenggoh Wildlife Centre</h2>

        <div className="row align-items-start g-4">
          <div className="col-md-6">
            <div className="card shadow-sm p-4 h-100">
              <h5 className="text-success fw-semibold mb-3">🌳 Visitor Information</h5>
              <p><strong>📍 Address:</strong> Jalan Tapang, 93250 Kuching, Sarawak, Malaysia</p>
              <p><strong>📞 Phone:</strong> +60 82-123456</p>
              <p><strong>✉️ Email:</strong> info@sarawakparks.com</p>

              <h6 className="mt-4 text-success fw-semibold">⏰ Operating Hours:</h6>
              <ul className="mb-0">
                <li>Mon–Thu: 8:00am – 5:30pm</li>
                <li>Fri: 8:00am – 11:45am & 2:15pm – 5:00pm</li>
                <li>Weekends & Public Holidays: Closed</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-2">
              <div className="ratio ratio-16x9 rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.321403!2d110.3467239!3d1.5533159"
                  title="Semenggoh Wildlife Centre Location"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="text-center text-muted small mt-2">📍 Semenggoh Wildlife Centre, Kuching, Sarawak</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted">
            Need help planning your visit? Explore our <Link to="/parks">Parks</Link> or <Link to="/activities">Activities</Link> pages for more.
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
