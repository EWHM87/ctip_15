// AdminAlertPanel.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const alertSound = '/image/alert.mp3';  // Put sound file in /public or /src

const socket = io('http://localhost:5000'); // Adjust if needed

function AdminAlertPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('new-alert', (data) => {
      setAlerts(prev => [data, ...prev]);
      new Audio(alertSound).play(); // Play sound
    });

    return () => socket.off('new-alert');
  }, []);

  return (
    <div className="alert alert-danger mt-3">
      <h5>🚨 Real-Time IoT Alerts</h5>
      {alerts.length === 0 ? (
        <p>No new alerts</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>
              <strong>{a.timestamp}</strong> – {a.location} – {a.species || 'Unknown'}
              {a.screenshot && (
                <div>
                  <img src={`http://localhost:5000${a.screenshot}`} alt="screenshot" width="200" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAlertPanel;
