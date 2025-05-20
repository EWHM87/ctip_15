import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function About() {
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

      {/* About Page Content */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">About Sarawak Forestry Corporation (SFC)</h2>
          <p className="text-muted">Dedicated to protecting Sarawak's biodiversity and empowering future generations.</p>
        </div>

        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
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
            <div className="ratio ratio-16x9 shadow-sm rounded">
              <iframe
                src="https://www.youtube.com/embed/LFMCQW4xh1s"
                title="About SFC"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-success h-100">
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
            <div className="card border-success h-100">
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

        <div className="card border-0 bg-light mt-5 shadow-sm">
          <div className="card-body">
            <h5 className="text-success fw-bold">🌍 Our Commitment</h5>
            <p>
              As stewards of Sarawak’s natural heritage, we are entrusted with a legacy of responsibility. With the support of our 
              communities, stakeholders, and dedicated staff, we aim to leave a lasting impact—not just for today, 
              but for the benefit of our children, our grandchildren, and future generations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
