import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import './App.css';

function PublicHome() {
  return (
    <>
      <PublicNavbar />
      <div className="hero-section text-white d-flex align-items-center justify-content-center">
        <div className="text-center bg-dark bg-opacity-50 p-4 rounded shadow">
          <h1 className="display-5 fw-bold">To Create & Sustain Totally Protected Areas</h1>
          <p className="lead">...and to conserve wildlife through innovation and best practices for all.</p>
        </div>
      </div>

      <div className="container mt-5" id="parks">
        <h2 className="text-center mb-4">Explore Our Parks</h2>
        <p className="text-center">Semenggoh, Lambir Hills, Niah Caves, and many more await you...</p>
        {/* Add more sections like carousels/images/info here */}
      </div>
    </>
  );
}

export default PublicHome;
