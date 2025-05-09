import React, { useEffect, useState } from 'react';

function ManageGuides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with your actual backend IP
  const BASE_URL = 'http://localhost:5000';

  // Fetch guides from backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/manage-guides`)
      .then((res) => res.json())
      .then((data) => {
        setGuides(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching guides:', err);
        setError('Failed to fetch guides');
        setLoading(false);
      });
  }, []);

  // Handle guide deletion
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to remove this guide?')) return;

    fetch(`${BASE_URL}/api/manage-guides/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || 'Guide removed successfully!');
        setGuides((prev) => prev.filter((guide) => guide.guide_id !== id));
      })
      .catch((err) => {
        console.error('❌ Error deleting guide:', err);
        alert('Failed to delete guide');
      });
  };

  return (
    <div className="container mt-4">
      <h2>👥 Manage Guides</h2>
      <p className="text-muted">This section is accessible to admins only.</p>

      {loading ? (
        <div className="alert alert-info mt-4">Loading guides...</div>
      ) : error ? (
        <div className="alert alert-danger mt-4">{error}</div>
      ) : guides.length === 0 ? (
        <div className="alert alert-info mt-4">No guides registered yet.</div>
      ) : (
        <table className="table table-striped mt-3">
          <thead className="table-success">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Certifications</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr key={guide.guide_id}>
                <td>{guide.name}</td>
                <td>{guide.email}</td>
                <td>{guide.certifications ? guide.certifications : '—'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(guide.guide_id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageGuides;
