import React, { useEffect, useState } from 'react';
import AuthService from './auth'; // Assuming it gives current user role

const SpeciesDatabase = () => {
  const [speciesList, setSpeciesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const role = AuthService.getRole(); // 'admin', 'guide', or 'visitor'

  const API_URL = 'http://localhost:5000/api/species'; // Change to your endpoint

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setSpeciesList(data);
        setFilteredSpecies(data);
      })
      .catch(err => console.error('Error fetching species data:', err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSpecies(
      speciesList.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term)
      )
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const updated = speciesList.filter(item => item._id !== id);
      setSpeciesList(updated);
      setFilteredSpecies(updated);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📚 View Species Records</h2>
      <p>This page displays a searchable database of previously identified species.</p>

      <input
        type="text"
        placeholder="🔍 Search by species name or type..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="row">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map(species => (
            <div className="col-md-4 mb-4" key={species._id}>
              <div className="card shadow-sm h-100">
                {species.image && (
                  <img
                    src={species.image}
                    alt={species.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{species.name}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {species.type}<br />
                    <strong>Identified on:</strong> {new Date(species.date).toLocaleDateString()}
                  </p>
                  {role === 'admin' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => alert('🔧 Implement edit modal')}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(species._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No species match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeciesDatabase;
