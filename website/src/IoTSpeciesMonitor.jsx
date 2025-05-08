import React, { useState, useEffect } from 'react';

// Dummy IoT data – simulate sensor input
const dummySensorData = [
  { location: 'Semenggoh', species: 'Orangutan', time: '2024-05-06 07:45', alert: false },
  { location: 'Gunung Mulu', species: 'Hornbill', time: '2024-05-06 09:10', alert: false },
  { location: 'Bako', species: 'Civet', time: '2024-05-06 10:05', alert: true },
];

function IoTSpeciesMonitor() {
  const [sensorLogs, setSensorLogs] = useState([]);

  useEffect(() => {
    // Simulate real-time update
    setSensorLogs(dummySensorData);
  }, []);

  return (
    <div className="container mt-4">
      <h2>🌿 IoT Species Monitor</h2>
      <p className="text-muted">View species recently detected by motion/wildlife sensors in protected parks.</p>

      {sensorLogs.length === 0 ? (
        <div className="alert alert-info">No sensor data available.</div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="table-success">
            <tr>
              <th>Location</th>
              <th>Species</th>
              <th>Detected Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sensorLogs.map((entry, index) => (
              <tr key={index} className={entry.alert ? 'table-danger' : ''}>
                <td>{entry.location}</td>
                <td>{entry.species}</td>
                <td>{entry.time}</td>
                <td>{entry.alert ? '⚠️ Alert' : '✅ Normal'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IoTSpeciesMonitor;
