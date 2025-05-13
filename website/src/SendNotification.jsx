import React, { useState, useEffect } from 'react';

function SendNotification() {
  const [selectedGuide, setSelectedGuide] = useState('All Guides');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [guides, setGuides] = useState(['All Guides']); // You can update this dynamically later
  const BASE_URL = 'http://localhost:5000';

  // Load past notifications on mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/notifications`)
      .then(res => res.json())
      .then(data => setSentMessages(data))
      .catch(err => console.error('❌ Failed to load notifications:', err));
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message.');

    try {
      const response = await fetch(`${BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: selectedGuide,
          content: message.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Notification sent!');
        setMessage('');
        setSentMessages(prev => [
          { id: data.id, recipient: selectedGuide, content: message.trim(), sent_at: new Date().toISOString() },
          ...prev
        ]);
      } else {
        console.error('❌ Send failed:', data);
        alert(data.message || 'Send failed.');
      }
    } catch (err) {
      console.error('❌ Error sending notification:', err);
      alert('Network or server error.');
    }
  };

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  return (
    <div className="container mt-4">
      <h2>📨 Send Notification</h2>
      <p className="text-muted">Send alerts or messages to park guides.</p>

      <form onSubmit={handleSend} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Select Recipient</label>
          <select className="form-select" value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)}>
            {guides.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Send</button>
      </form>

      <hr />
      <h5>🗂️ Sent Notifications</h5>
      {sentMessages.length === 0 ? (
        <p className="text-muted">No messages sent yet.</p>
      ) : (
        <ul className="list-group">
          {sentMessages.map((msg) => (
            <li key={msg.id} className="list-group-item">
              <strong>To:</strong> {msg.recipient}<br />
              <strong>Message:</strong> {msg.content}<br />
              <small className="text-muted">Sent on: {formatDateTime(msg.sent_at)}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SendNotification;
