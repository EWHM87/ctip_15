import React, { useEffect, useState } from 'react';
import AuthService from './auth';

function MyCertifications() {
  const [certs, setCerts] = useState([]);
  const guideId = AuthService.getUserId();
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/certifications/${guideId}`)
      .then(res => res.json())
      .then(setCerts)
      .catch(err => console.error('❌ Error fetching certs:', err));
  }, [guideId]);

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
          {certs.map((c, i) => (
            <tr key={i}>
              <td>{c.certification_name}</td>
              <td>{c.status}</td>
              <td>{c.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCertifications;
