import React, { useEffect, useState } from 'react';
import AuthService from './auth';

function MyCertifications() {
  const [certs, setCerts] = useState([]);
  const username = AuthService.getUser()?.username;
  const BASE_URL = 'http://localhost:5000';

useEffect(() => {
  if (!username) return;

  const fetchCerts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/my-certifications-by-username?username=${encodeURIComponent(username)}`);
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();
      console.log('✅ Fetched certs:', data);
      setCerts(data);
    } catch (err) {
      console.error('❌ Error fetching certs:', err);
    }
  };

  fetchCerts();
}, [username]);

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
          {certs.length > 0 ? (
            certs.map((c, i) => (
              <tr key={i}>
                <td>{c.certification_name}</td>
                <td>{c.status}</td>
                <td>{c.expiry_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No certifications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyCertifications;
