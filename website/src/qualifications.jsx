import React, { useState } from 'react';

function Qualifications() {
  const [certification, setCertification] = useState('');
  const [certData, setCertData] = useState([
    { name: 'John Doe', cert: 'Biodiversity Basics', expires: '2025-06-01' },
    { name: 'Jane Smith', cert: 'Sustainable Tourism', expires: '2024-12-15' },
  ]);

  const handleAssign = (index) => {
    if (!certification.trim()) return alert('Please enter certification name');
    const today = new Date();
    const expiry = new Date();
    expiry.setFullYear(today.getFullYear() + 1);

    const updated = [...certData];
    updated[index] = {
      ...updated[index],
      cert: certification,
      expires: expiry.toISOString().split('T')[0],
    };
    setCertData(updated);
    setCertification('');
    alert('Certification updated!');
  };

  return (
    <div className="container mt-4">
      <h2>🎓 Guide Certifications</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Guide Name</th>
            <th>Certification</th>
            <th>Expiry Date</th>
            <th>Assign New</th>
          </tr>
        </thead>
        <tbody>
          {certData.map((g, i) => (
            <tr key={i}>
              <td>{g.name}</td>
              <td>{g.cert}</td>
              <td>{g.expires}</td>
              <td>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Eco Guiding"
                    value={i === certData.index ? certification : ''}
                    onChange={(e) => setCertification(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => handleAssign(i)}>
                    ➕
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Qualifications;
