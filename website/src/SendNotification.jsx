// src/SendNotification.jsx
import React, { useState, useEffect } from 'react';

const BASE = 'http://localhost:5000';
const getToken = () => localStorage.getItem('token');

export default function SendNotification() {
  const [guides, setGuides] = useState([]);
  const [selected, setSelected] = useState('all');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  // 1️⃣ Load dropdown of guides + "All Guides"
  useEffect(() => {
    fetch(`${BASE}/api/guides`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
      .then(r => r.json())
      .then(data => {
        // data: [{id,username},...]
        setGuides([{ id: 'all', username: 'All Guides' }, ...data]);
      })
      .catch(console.error);
  }, []);

  // 2️⃣ Load existing notifications
  useEffect(() => {
    fetch(`${BASE}/api/notifications`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
      .then(r => r.json())
      .then(data => {
        console.log('Fetched notifications:', data);
        setSentMessages(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  // 3️⃣ Send handler
  const handleSend = async e => {
    e.preventDefault();
    if (!message.trim()) return alert('Enter a message');

    const payload = { recipient: selected, content: message.trim() };
    const res = await fetch(`${BASE}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });

    const body = await res.json();
    if (!res.ok) {
      return alert(body.message || 'Send failed');
    }

    const whom =
      selected === 'all'
        ? 'All Guides'
        : guides.find(g => g.id.toString() === selected)?.username;

    setSentMessages(prev => [
      {
        id: body.firstId,
        guide_name: whom,
        content: message.trim(),
        sent_at: new Date().toISOString()
      },
      ...prev
    ]);

    setMessage('');
    alert('✅ Sent');
  };

  // 4️⃣ Clear All handler
  const handleClearAll = async () => {
    if (!window.confirm('Delete ALL notifications?')) return;

    const res = await fetch(`${BASE}/api/notifications`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    const body = await res.json();
    if (!res.ok) return alert(body.message || 'Clear failed');

    setSentMessages([]);
    alert(body.message);
  };

  const fmt = dt =>
    new Date(dt).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  return (
    <div className="container mt-4">
      <h2>📨 Send Notification</h2>
      <form onSubmit={handleSend} className="mb-3">
        <select
          className="form-select mb-2"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {guides.map(g => (
            <option key={g.id} value={g.id}>
              {g.username}
            </option>
          ))}
        </select>

        <textarea
          className="form-control mb-2"
          rows={3}
          placeholder="Type your message…"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <button className="btn btn-primary me-2">Send</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </form>

      <hr />

      <h5>🗂️ Sent Notifications</h5>
      {sentMessages.length === 0 ? (
        <p className="text-muted">No messages sent yet.</p>
      ) : (
        <ul className="list-group">
          {sentMessages.map(msg => (
            <li key={msg.id} className="list-group-item">
              <strong>To:</strong> {msg.guide_name}<br />
              <strong>Message:</strong> {msg.content}<br />
              <small className="text-muted">
                Sent on {fmt(msg.sent_at)}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
