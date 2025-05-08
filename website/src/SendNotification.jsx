import React, { useState, useEffect } from 'react';

// Dummy guide list — replace with real guide data later
const guides = ['All Guides', 'John Doe', 'Jane Smith', 'Adam Lee'];

function SendNotification() {
  const [selectedGuide, setSelectedGuide] = useState('All Guides');
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sentNotifications')) || [];
    setSentMessages(saved);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message.');

    const newNotification = {
      to: selectedGuide,
      content: message.trim(),
      date: new Date().toLocaleString(),
    };

    const updated = [newNotification, ...sentMessages];
    setSentMessages(updated);
    localStorage.setItem('sentNotifications', JSON.stringify(updated));
    setMessage('');
    alert('✅ Notification sent!');
  };

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
          {sentMessages.map((msg, i) => (
            <li key={i} className="list-group-item">
              <strong>To:</strong> {msg.to}<br />
              <strong>Message:</strong> {msg.content}<br />
              <small className="text-muted">Sent on: {msg.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SendNotification;
