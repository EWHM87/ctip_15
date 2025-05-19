import React from 'react';
import './App.css';
import { Link, NavLink } from 'react-router-dom';

function History() {
  const events = [
    {
      year: 1975,
      title: 'Semenggoh Established',
      description: 'The wildlife centre was founded to rehabilitate injured and orphaned orangutans.'
    },
    {
      year: 1985,
      title: 'Public Opening',
      description: 'The centre was opened to the public for educational visits and orangutan observation.'
    },
    {
      year: 2000,
      title: 'Conservation Expansion',
      description: 'Expanded forest reserve and trail systems to support wildlife research.'
    },
    {
      year: 2020,
      title: 'Digital Guidebook Initiative',
      description: 'Introduced technology for visitors: interactive maps, live updates, and AI-enhanced guides.'
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

      {/* Timeline Content */}
      <div className="gb-history-container container py-5">
        <h2 className="text-center fw-bold text-success mb-4">🏛️ Semenggoh Park Heritage</h2>
        <p className="text-center text-muted mb-5">
          Learn about the history, milestones, and conservation legacy of Sarawak’s beloved orangutan sanctuary.
        </p>

        <div className="timeline">
          {events.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-details">
                <h5>{item.title}</h5>
                <p className="text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
