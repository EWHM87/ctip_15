import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Wildlife() {
  const species = [
    {
      name: 'Orangutan (Pongo pygmaeus)',
      emoji: '🦧',
      image: '/image/orangutan.jpg',
      description: 'The iconic semi-wild residents of Semenggoh. Critically endangered. Sightings during feeding sessions.'
    },
    {
      name: 'Rhinoceros Hornbill',
      emoji: '🦜',
      image: '/image/hornbill.jpg',
      description: 'Sarawak’s state bird. Known for its bright casque and echoing call.'
    },
    {
      name: 'Bornean Gibbon',
      emoji: '🐒',
      image: '/image/gibbon.jpg',
      description: 'Rare and agile apes with haunting morning calls. Arboreal and hard to spot.'
    },
    {
      name: 'Crocodile',
      emoji: '🐊',
      image: '/image/crocodile.jpg',
      description: 'Found in surrounding rivers. Dangerous but rarely seen within the park’s visitor zones.'
    },
    {
      name: 'Nepenthes (Pitcher Plant)',
      emoji: '🪴',
      image: '/image/pitcherplant.jpg',
      description: 'A carnivorous plant native to Borneo’s rainforests. Beautiful but protected.'
    }
  ];

  return (
    <>
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

      {/* Wildlife Intro */}
      <div className="wildlife-container container py-5">
        <h2 className="text-center text-success fw-bold mb-4">
          🌿 Wildlife at Semenggoh, Kuching Sarawak
        </h2>
        <p className="text-center text-muted mb-5 px-md-5">
          Semenggoh is home to endangered and protected species — from majestic orangutans to exotic hornbills.
          Learn about these forest dwellers and how you can help protect them.
        </p>

        <div className="row g-4">
          {species.map((animal, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card wildlife-card h-100 shadow-sm">
                <img
                  src={animal.image}
                  className="card-img-top wildlife-img"
                  alt={animal.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{animal.emoji} {animal.name}</h5>
                  <p className="card-text text-muted">{animal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 small text-muted">
          <p>⚠️ Protected by the Sarawak Wild Life Protection Ordinance 1998.</p>
          <p>Do not hunt, harm, keep or trade. Penalties up to RM50,000 and 5 years’ jail.</p>
        </div>
      </div>
    </>
  );
}

export default Wildlife;
