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
          {reminders.map((item, index) => {
            const expiryDate = new Date(item.expiry_date);
            const today = new Date();
            const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

            let rowClass = '';
            if (diffDays <= 7) rowClass = 'table-danger';       // 🔴
            else if (diffDays <= 14) rowClass = 'table-warning'; // 🟠
            else if (diffDays <= 30) rowClass = 'table-light';   // 🟡

            const formattedDate = expiryDate.toLocaleDateString('en-MY', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <tr key={index} className={rowClass}>
                <td>{item.name}</td>
                <td>{item.certification_name}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CertificationReminders;
