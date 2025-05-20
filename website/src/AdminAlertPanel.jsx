import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
const alertSound = new Audio('/image/alert.mp3');
const ALERTS_PER_PAGE = 3;

function AdminAlertPanel() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  fetch('http://localhost:5000/api/alerts')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        console.warn('❗ Unexpected response format:', data);
        setAlerts([]);
      }
    })
    .catch((err) => {
      console.error('❌ Failed to load past alerts:', err.message);
      setAlerts([]); // prevent stale state
    });

  socket.on('new-alert', (data) => {
    setAlerts((prev) => [data, ...prev]);
    alertSound.play().catch(() => {});
  });

  return () => socket.off('new-alert');
}, []);

  // Pagination logic
  const totalPages = Math.ceil(alerts.length / ALERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * ALERTS_PER_PAGE;
  const currentAlerts = Array.isArray(alerts)
    ? alerts.slice(startIndex, startIndex + ALERTS_PER_PAGE)
    : [];

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="alert alert-danger mt-4 shadow-sm rounded p-4">
      <h4 className="mb-4">
        <span role="img" aria-label="alert">🚨</span> Real-Time IoT Alerts
      </h4>

      {currentAlerts.length === 0 ? (
        <p className="text-muted">No alerts available.</p>
      ) : (
        <ul className="list-unstyled">
          {currentAlerts.map((alert, index) => (
            <li key={index} className="mb-4 border-bottom pb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">🕒</span>
                <strong>{alert.timestamp}</strong>
              </div>
              {alert.screenshot && (
                <a
                  href={`http://localhost:5000${alert.screenshot}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`http://localhost:5000${alert.screenshot}`}
                    alt="Camera snapshot"
                    width="260"
                    className="img-thumbnail shadow-sm"
                    style={{
                      borderRadius: '8px',
                      cursor: 'zoom-in',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-light btn-sm mx-1"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ◀ Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm mx-1 ${i + 1 === currentPage ? 'btn-dark' : 'btn-outline-light'}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-light btn-sm mx-1"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminAlertPanel;
