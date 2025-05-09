import React, { useEffect, useState } from 'react';

function CertificationReminders() {
  const [reminders, setReminders] = useState([]);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/certifications/reminders`)
      .then(res => res.json())
      .then(setReminders)
      .catch(err => console.error('❌ Error loading reminders:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Certification Renewal Reminders</h2>
      <table className="table table-hover mt-3">
        <thead className="table-warning">
          <tr>
            <th>Guide Name</th>
            <th>Certification</th>
            <th>Renewal Due</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.certification_name}</td>
              <td>{item.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificationReminders;
