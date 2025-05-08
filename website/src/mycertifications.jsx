import React from 'react';

const myCerts = [
  { title: 'Sustainable Tourism', status: 'Valid', expires: '2025-01-15' },
  { title: 'First Aid Training', status: 'Expiring Soon', expires: '2024-06-01' },
];

function MyCertifications() {
  return (
    <div className="container mt-4">
      <h2>My Certifications</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Certification</th>
            <th>Status</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {myCerts.map((c, i) => (
            <tr key={i}>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>{c.expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCertifications;
