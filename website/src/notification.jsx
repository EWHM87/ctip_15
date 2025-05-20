// src/Notification.jsx
import React, { useEffect, useState } from 'react';
import AuthService from './auth';

const BASE = 'http://localhost:5000';
const getToken = () => localStorage.getItem('token');

export default function Notification() {
  const [messages, setMessages] = useState([]);
  const user = AuthService.getCurrentUser?.() || AuthService.getUser?.();

  // Fetch only **this** guide’s notifications
  useEffect(() => {
    if (!user || user.role !== 'guide') return;

    fetch(`${BASE}/api/notifications/me`, {
      headers: { Authorization:`Bearer ${getToken()}` }
    })
      .then(r => r.json())
      .then(setMessages)
      .catch(console.error);
  }, [user]);

  // Clear only this guide’s notifications
  const handleClear = async () => {
    if (!window.confirm('Clear all your notifications?')) return;
    const res = await fetch(`${BASE}/api/notifications/me`, {
      method:'DELETE',
      headers:{ Authorization:`Bearer ${getToken()}` }
    });
    const body = await res.json();
    if (!res.ok) {
      return alert(body.message || 'Could not clear');
    }
    setMessages([]);
    alert(body.message);
  };

  const fmt = dt =>
    new Date(dt).toLocaleString(undefined, {
      year:'numeric',month:'short',day:'numeric',
      hour:'2-digit',minute:'2-digit'
    });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📬 My Notifications</h2>
        {messages.length>0 && (
          <button
            className="btn btn-sm btn-danger"
            onClick={handleClear}
          >
            Clear All
          </button>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="text-muted">No notifications yet.</p>
      ) : (
        <ul className="list-group">
          {messages.map(m => (
            <li key={m.id} className="list-group-item">
              {m.content}<br/>
              <small className="text-muted">
                Received {fmt(m.sent_at)}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
