import React, { useState } from 'react';

const dummyHistory = [
  { topic: 'Eco-tourism Basics', date: '2024-04-10', status: 'Completed' },
  { topic: 'Wildlife Ethics', date: '2024-06-10', status: 'Upcoming' },
  { topic: 'Flora Protection', date: '2024-07-15', status: 'Upcoming' }
];

function MyTrainingHistory() {
  const [filter, setFilter] = useState('All');

  const filtered = dummyHistory.filter(t => filter === 'All' || t.status === filter);

  return (
    <div className="container mt-4">
      <h2>📋 My Training History</h2>

      <div className="mb-3">
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Topic</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t, i) => (
            <tr key={i}>
              <td>{t.topic}</td>
              <td>{t.date}</td>
              <td>{t.status === 'Completed' ? '✅ Completed' : '📅 Upcoming'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTrainingHistory;
