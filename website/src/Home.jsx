import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
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
                <li className="nav-item"><Link className="nav-link" to="/feedback">Feedback</Link></li>
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
      <section className="home-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="bg-dark bg-opacity-50 p-4 rounded shadow-lg w-75">
          <h1 className="display-5 fw-bold">Protecting Orangutans & Rainforest Heritage</h1>
          <p className="lead">Semenggoh Wildlife Centre is dedicated to orangutan conservation, eco-tourism, and biodiversity education in Kuching, Sarawak.</p>
          <Link to="/guidebook" className="btn btn-outline-light btn-lg mt-3">🗺️ Explore Interactive Guidebook</Link>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container my-5 home-featured">
        <h3 className="text-center mb-4 fw-bold">🌟 Explore Semenggoh</h3>
        <div className="row text-center">
          {[
            {
              title: '🏞️ Park Info',
              text: 'View trail maps, visiting hours, and park rules for a safe, enriching experience.',
              link: '/parks',
              btn: 'Park Information'
            },
            {
              title: '🦧 Wildlife',
              text: 'Learn about our orangutans, hornbills, and other protected species in Semenggoh.',
              link: '/wildlife',
              btn: 'Meet the Wildlife'
            },
            {
              title: '🎯 Activities',
              text: 'Join ranger-led walks, feeding sessions, and educational programs for all ages.',
              link: '/activities',
              btn: 'View Activities'
            }
          ].map((card, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm border-0 home-card">
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <Link to={card.link} className="btn btn-outline-success">{card.btn}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container my-5 home-about">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fw-bold">About Semenggoh</h3>
            <p>
              Located just 20km from Kuching, Semenggoh Wildlife Centre is Sarawak’s leading facility for orangutan rehabilitation and rainforest conservation.
              Managed by Sarawak Forestry Corporation (SFC), we welcome visitors to observe semi-wild orangutans in their natural habitat and to learn about conservation efforts.
            </p>
            <Link to="/about" className="btn btn-outline-success mt-3">Read More</Link>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="ratio ratio-16x9 rounded shadow-sm overflow-hidden">
              <iframe
                src="/image/semenggoh.mp4"
                title="Semenggoh Wildlife Centre"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Section */}
      <section className="text-white py-5 home-follow text-center">
        <h4>📣 Follow Us on Facebook for Updates & Orangutan Sightings</h4>
      </section>

      {/* Footer */}
      <footer className="bg-success text-white pt-4 pb-3 px-3 home-footer">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h6>SEMEMNGGOH WILDLIFE CENTRE</h6>
            <p className="mb-0">Jalan Puncak Borneo, 93250 Kuching, Sarawak, Malaysia</p>
            <p className="mb-0">Phone: +60 82-618325</p>
            <p className="mb-0">Email: semenggoh@sarawakparks.com</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Operating Hours</h6>
            <p className="mb-0">Feeding Sessions: 9–10 AM & 3–4 PM</p>
            <p className="mb-0">Open daily including weekends & holidays</p>
            <p className="mb-0">Tickets available on-site</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <Link to="/parks" className="d-block text-white">Park Info</Link>
            <Link to="/wildlife" className="d-block text-white">Wildlife</Link>
            <Link to="/contact" className="d-block text-white">Contact Us</Link>
          </div>
        </div>
        <div className="text-center mt-3">
          <small>© 2025 Semenggoh Wildlife Centre. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default Home;
