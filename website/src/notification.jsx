import React, { useEffect, useState } from 'react';
import AuthService from './auth'; // Must return guide's username

function Notification() {
  const [messages, setMessages] = useState([]);
  const guideName = AuthService.getUser()?.username;
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    if (!guideName) return;

    fetch(`${BASE_URL}/api/notifications`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(msg =>
          msg.recipient === 'All Guides' || msg.recipient === guideName
        );
        setMessages(filtered);
      })
      .catch(err => console.error('❌ Failed to load notifications:', err));
  }, [guideName]);

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  return (
    <div className="container mt-4">
      <h2>📬 My Notifications</h2>
      {messages.length === 0 ? (
        <p className="text-muted">No notifications yet.</p>
      ) : (
        <ul className="list-group">
          {messages.map((msg) => (
            <li key={msg.id} className="list-group-item">
              <strong>From Admin:</strong><br />
              <span>{msg.content}</span><br />
              <small className="text-muted">Received on: {formatDateTime(msg.sent_at)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
