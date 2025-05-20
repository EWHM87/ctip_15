import React, { useEffect, useState } from 'react';

function CertificationReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:5000';

useEffect(() => {
  fetch(`${BASE_URL}/api/certifications/reminders`)
    .then(res => res.json())
    .then(data => {
      console.log('📢 Reminders received:', data);  // ⬅️ Add this
      setReminders(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('❌ Error loading reminders:', err);
      setLoading(false);
    });
}, []);

  const getRowClass = (expiryDate) => {
    const today = new Date();
    const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) return 'table-danger';       // 🔴 Urgent
    if (diffDays <= 14) return 'table-warning';     // 🟠 Soon
    if (diffDays <= 30) return 'table-light';       // 🟡 Moderate
    return '';
  };

  return (
    <div className="container mt-4">
      <h2>Certification Renewal Reminders</h2>

      {loading ? (
        <p>Loading reminders...</p>
      ) : reminders.length === 0 ? (
        <div className="alert alert-success mt-4">
          ✅ No certifications due within 30 days.
        </div>
      ) : (
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
              const rowClass = getRowClass(expiryDate);

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
      )}
    </div>
  );
}

export default CertificationReminders;
