import React, { useEffect, useState } from 'react';

function IoTSpeciesMonitor() {
  const [sensorLogs, setSensorLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:5000/api/sensor-logs')
      .then(res => res.json())
      .then(data => {
        setSensorLogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to fetch IoT data:', err);
        setLoading(false);
      });
  }, []);

  const clearTable = () => {
    setSensorLogs([]); // frontend reset only
    // Optionally trigger a backend delete: fetch('/api/clear-logs', { method: 'DELETE' })
  };

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = sensorLogs.slice(indexOfFirstLog, indexOfLastLog);

  const totalPages = Math.ceil(sensorLogs.length / logsPerPage);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🌿 IoT Species Monitor</h2>
      <p className="text-muted">Live feed from wildlife sensors deployed in national parks.</p>

      <div className="mb-3">
        <button onClick={clearTable} className="btn btn-danger">Clear Table</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Species</th>
                <th>Detected Time</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Soil Moisture (%)</th>
                <th>Solar (lux)</th>
                <th>Motion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((entry, index) => (
                <tr key={index} className={entry.alert ? 'table-danger' : ''}>
                  <td>{entry.species}</td>
                  <td>{new Date(entry.time).toLocaleString()}</td>
                  <td>{entry.temperature}°C</td>
                  <td>{entry.humidity}%</td>
                  <td>{entry.soil_moisture || '-'}</td>
                  <td>{entry.solar || '-'}</td>
                  <td>{entry.motion ? '🟢 Yes' : '⚪ No'}</td>
                  <td>{entry.alert ? '⚠️ Alert' : '✅ Normal'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination UI */}
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="page-link">{i + 1}</span>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default IoTSpeciesMonitor;
