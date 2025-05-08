import React, { useEffect, useState } from 'react';

// Dummy activity log – simulate history of actions
const dummyLog = [
  { guide: 'Jane Smith', action: 'Signed up for Wildlife Handling', date: '2024-05-01 09:22' },
  { guide: 'John Doe', action: 'Signed up for Flora Protection', date: '2024-05-03 14:11' },
  { guide: 'Adam Lee', action: 'Completed Eco-tourism Basics', date: '2024-05-04 10:45' },
];

function GuideActivityLog() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // Simulate fetch from backend/localStorage
    setActivity(dummyLog);
  }, []);

  return (
    <div className="container mt-4">
      <h2>🧾 Guide Activity Log</h2>
      <p className="text-muted">Track what actions guides have taken (training sign-ups, completions, etc.).</p>

      {activity.length === 0 ? (
        <div className="alert alert-info">No recent activity.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Guide</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((log, i) => (
              <tr key={i}>
                <td>{log.guide}</td>
                <td>{log.action}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GuideActivityLog;
