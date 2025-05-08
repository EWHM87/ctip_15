import React, { useEffect, useState } from 'react';

// Dummy data for demonstration — replace with real API later
const dummyGuides = [
  { id: 1, name: 'John Doe', email: 'john@example.com', certifications: ['Eco-tourism', 'Wildlife'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', certifications: [] },
  { id: 3, name: 'Adam Lee', email: 'adam@example.com', certifications: ['Biodiversity'] },
];

function ManageGuides() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setGuides(dummyGuides);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this guide?')) {
      setGuides(prev => prev.filter(g => g.id !== id));
      alert('Guide removed successfully!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>👥 Manage Guides</h2>
      <p className="text-muted">This section is accessible to admins only.</p>

      {guides.length === 0 ? (
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
              <tr key={guide.id}>
                <td>{guide.name}</td>
                <td>{guide.email}</td>
                <td>{guide.certifications.length}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(guide.id)}>
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
