import React, { useEffect, useState } from 'react';

function ManageGuides() {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });

  const BASE_URL = 'http://localhost:5000'; // Change this to your actual IP on mobile

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = () => {
    fetch(`${BASE_URL}/api/manage-guides`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGuides(data);
        } else {
          setError('Unexpected data format received');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching guides:', err);
        setError('Failed to fetch guide data');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;

    fetch(`${BASE_URL}/api/manage-guides/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Guide deleted');
        fetchGuides(); // Refresh list
      })
      .catch(err => {
        console.error('❌ Delete error:', err);
        alert('Failed to delete guide');
      });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({
      name: guides[index].name,
      email: guides[index].email,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (id) => {
    fetch(`${BASE_URL}/api/manage-guides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Guide updated');
        setEditIndex(null);
        fetchGuides();
      })
      .catch(err => {
        console.error('❌ Update error:', err);
        alert('Failed to update guide');
      });
  };

  return (
    <div className="container mt-4">
      <h2>👥 Manage Park Guides</h2>
      <p className="text-muted">Admin can view, edit, or delete guide accounts here.</p>

      {loading ? (
        <div className="alert alert-info">Loading guide data...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-success">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Certification</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.length > 0 ? (
              guides.map((guide, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      guide.name
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="form-control form-control-sm"
                      />
                    ) : (
                      guide.email
                    )}
                  </td>
                  <td>{guide.certification_name || '—'}</td>
                  <td>{guide.expiry_date || '—'}</td>
                  <td>{guide.status || '—'}</td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-1"
                          onClick={() => handleEditSave(guide.guide_id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleEditClick(index)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(guide.guide_id)}
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No guides found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageGuides;
