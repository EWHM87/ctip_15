import React, { useState, useEffect } from 'react';

function IoTSpeciesMonitor() {
  const [sensorLogs, setSensorLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/iot-sensor-data')
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

  return (
    <div className="container mt-4">
      <h2>🌿 IoT Species Monitor</h2>
      <p className="text-muted">Live feed from wildlife sensors deployed in national parks.</p>

      {loading ? (
        <div className="alert alert-info">Loading sensor data...</div>
      ) : sensorLogs.length === 0 ? (
        <div className="alert alert-warning">No sensor logs found.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Location</th>
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
            {sensorLogs.map((entry, index) => (
              <tr key={index} className={entry.alert ? 'table-danger' : ''}>
                <td>{entry.location}</td>
                <td>{entry.species}</td>
                <td>{entry.time}</td>
                <td>{entry.temperature}°C</td>
                <td>{entry.humidity}%</td>
                <td>{entry.soil_moisture}%</td>
                <td>{entry.solar} lux</td>
                <td>{entry.motion ? '🟢 Yes' : '⚪ No'}</td>
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
