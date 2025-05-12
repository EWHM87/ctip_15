import React, { useState, useEffect } from 'react';
import AuthService from './auth';

function MyTrainingHistory() {
  const [filter, setFilter] = useState('All');
  const [history, setHistory] = useState([]);
  const guideId = AuthService.getUserId();

  useEffect(() => {
    fetch(`/api/my-training/${guideId}`)
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error('❌ Error fetching training history:', err));
  }, [guideId]);

  const filtered = history.filter(t => filter === 'All' || t.status === filter);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

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
              <td>{formatDate(t.date)}</td>
              <td>{t.status === 'Completed' ? '✅ Completed' : '📅 Upcoming'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTrainingHistory;
