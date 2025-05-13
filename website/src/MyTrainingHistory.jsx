import React, { useState, useEffect } from 'react';
import AuthService from './auth';

function MyTrainingHistory() {
  const [filter, setFilter] = useState('All');
  const [history, setHistory] = useState([]);
  const role = AuthService.getRole();
  const guideId = AuthService.getUserId();
  const BASE_URL = 'http://localhost:5000';

useEffect(() => {
  const url = role === 'admin'
    ? `${BASE_URL}/api/all-training-history`
    : `${BASE_URL}/api/my-training/${guideId}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        console.error('❌ Unexpected response format:', data);
        setHistory([]); // fallback to empty array
      }
    })
    .catch(err => {
      console.error('❌ Error fetching training history:', err);
      setHistory([]); // fallback to empty array
    });
}, [guideId, role]);

  const filtered = history.filter(t => filter === 'All' || t.status === filter);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const markCompleted = (id) => {
    fetch(`${BASE_URL}/api/guide-training/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setHistory(prev =>
          prev.map(t => (t.id === id ? { ...t, status: 'Completed' } : t))
        );
      })
      .catch(err => {
        console.error('❌ Status update failed:', err);
        alert('Failed to update training status.');
      });
  };

  return (
    <div className="container mt-4">
      <h2>{role === 'admin' ? '📊 All Guide Trainings' : '📋 My Training History'}</h2>

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
            {role === 'admin' && <th>Guide ID</th>}
            <th>Topic</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((t, i) => (
              <tr key={i}>
                {role === 'admin' && <td>{t.guide_id}</td>}
                <td>{t.topic}</td>
                <td>{formatDate(t.date)}</td>
                <td>
                  {t.status === 'Completed' ? (
                    '✅ Completed'
                  ) : (
                    <>
                      📅 Upcoming
                      {role === 'admin' && (
                        <button
                          className="btn btn-sm btn-success ms-2"
                          onClick={() => markCompleted(t.id)}
                        >
                          Mark Completed
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'admin' ? 4 : 3} className="text-center text-muted">
                No training records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyTrainingHistory;
