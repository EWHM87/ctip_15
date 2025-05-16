import React, { useEffect, useState } from 'react';

function GuideActivityLog() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/guide-activity-log')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setActivity(data);
        } else {
          setActivity([]);
          console.error('❌ Unexpected response:', data);
          setError('Server returned unexpected data.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Fetch failed:', err);
        setError('Failed to load activity log.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>🧾 Guide Activity Log</h2>
      <p className="text-muted">Track what actions guides have taken (training sign-ups, completions, certifications, etc.).</p>

      {loading ? (
        <div className="alert alert-info">Loading activity logs...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : activity.length === 0 ? (
        <div className="alert alert-warning">No recent activity found.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Guide</th>
              <th>Action</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((log, i) => (
              <tr key={i}>
                <td>{log.guide}</td>
                <td>{log.action}</td>
                <td>{log.description}</td>
                <td>{new Date(log.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GuideActivityLog;
