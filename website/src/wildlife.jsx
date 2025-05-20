import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Wildlife() {
  const orangutans = [
    {
      name: 'Minah',
      emoji: '🦧',
      image: '/image/orangutan_minah.jpg',
      description: 'Female, 37 years old. One of the oldest and wisest orangutans at Semenggoh. Often seen at feeding platforms.'
    },
    {
      name: 'Ooooha',
      emoji: '🦧',
      image: '/image/orangutan_oooha.jpg',
      description: 'Male, 6 years old. Young, playful, and curious. Learning independence under ranger supervision.'
    },
    {
      name: 'Edwin',
      emoji: '🦧',
      image: '/image/orangutan_edwin.jpg',
      description: 'Male, 29 years old. Calm and strong. Frequently appears during morning feeding sessions.'
    },
    {
      name: 'Ganya',
      emoji: '🦧',
      image: '/image/orangutan_ganya.jpg',
      description: 'Male, 17 years old. Known for his agility and calm demeanor. Often seen in the afternoon.'
    },
    {
      name: 'Analisa',
      emoji: '🦧',
      image: '/image/orangutan_analisa.jpg',
      description: 'Female, 29 years old. Protective and nurturing mother. Frequently appears with her baby.'
    },
    {
      name: "Analisa's Newborn",
      emoji: '🦧',
      image: '/image/orangutan_baby.jpg',
      description: 'Male, 3 years old. Always seen clinging to Analisa. One of the youngest orangutans at the centre.'
    }
  ];

  return (
    <>
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

      <div className="wildlife-section container py-5">
        <h2 className="text-center text-success fw-bold mb-4">🦧 Semenggoh Orangutans – Resident Profiles</h2>
        <p className="text-center text-muted mb-5 px-md-5">
          Get to know the orangutans who call Semenggoh Wildlife Centre their home.
          These individuals are semi-wild and roam freely in the reserve.
        </p>

        <div className="row g-4">
          {orangutans.map((orangutan, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card wildlife-orangutan-card h-100 shadow-sm">
                <img
                  src={orangutan.image}
                  className="card-img-top wildlife-orangutan-img"
                  alt={orangutan.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{orangutan.emoji} {orangutan.name}</h5>
                  <p className="card-text text-muted">{orangutan.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 small text-muted">
          <p>⚠️ Protected under Sarawak Wild Life Protection Ordinance 1998.</p>
          <p>Do not approach, feed, or interfere. Penalties apply for violations.</p>
        </div>
      </div>
    </>
  );
}

export default Wildlife;