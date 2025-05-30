import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function About() {
  return (
    <div>
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

      {/* About Page Content */}
      <div className="container py-5 about-container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">About Sarawak Forestry Corporation (SFC)</h2>
          <p className="text-muted">Dedicated to protecting Sarawak's biodiversity and empowering future generations.</p>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100 about-card">
              <div className="card-body">
                <h5 className="text-success fw-bold mb-3">Who We Are</h5>
                <p>
                  Sarawak Forestry Corporation (SFC) is a statutory body under the Sarawak Government formed under the
                  <strong> Sarawak Forestry Corporation Ordinance, 1995</strong>. Our core mission is to manage 
                  <strong> Totally Protected Areas (TPAs)</strong> and preserve the biodiversity of Sarawak.
                </p>
                <p>
                  We operate under the <strong>National Parks and Nature Reserves Ordinance 1998</strong> and the
                  <strong> Wildlife Protection Ordinance 1998</strong>, focusing on protecting Sarawak’s flora, fauna, 
                  and ecosystems—especially protected species.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <div className="shadow-sm rounded overflow-hidden">
              <img
                src="/image/wildlifecenter.jpg"
                alt="Semenggoh Wildlife Centre"
                className="img-fluid w-100"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-success h-100 about-card">
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">🌱 Our Key Focus</h5>
                <ul className="mb-0">
                  <li>Managing TPAs: national parks, sanctuaries, nature reserves</li>
                  <li>Flora and fauna protection, regeneration, and rehabilitation</li>
                  <li>Biodiversity conservation inside & outside protected areas</li>
                  <li>Eco-education, training & sustainability awareness</li>
                  <li>Nature-based & community eco-tourism development</li>
                  <li>Conservation-focused business and project planning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-success h-100 about-card">
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">🏆 Our Achievements</h5>
                <p>
                  With over 15 years of management under SFCSB, SFC has built a solid foundation in conservation:
                </p>
                <ul>
                  <li>Comprehensive scientific & technical infrastructure</li>
                  <li>Proven success in TPA and biodiversity management</li>
                  <li>Dynamic, evolving management approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 bg-light mt-5 shadow-sm about-card">
          <div className="card-body">
            <h5 className="text-success fw-bold">🌍 Our Commitment</h5>
            <p>
              As stewards of Sarawak’s natural heritage, we are entrusted with a legacy of responsibility.
              With the support of our communities, stakeholders, and dedicated staff, we aim to leave a lasting impact—not just for today,
              but for the benefit of our children, our grandchildren, and future generations.
            </p>
          </div>
        </div>
      </div>

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

export default About;
