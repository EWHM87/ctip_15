import React, { useState, useEffect } from 'react';

function Qualifications() {
  const [certification, setCertification] = useState('');
  const [guides, setGuides] = useState([]);
  const [certData, setCertData] = useState([]);

  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    // Fetch guide list and certification list
    fetch(`${BASE_URL}/api/manage-guides`)
      .then(res => res.json())
      .then(data => {
        setGuides(data);
        const guideIds = data.map(g => g.guide_id);

        // For each guide, fetch their certs
        Promise.all(guideIds.map(id =>
          fetch(`${BASE_URL}/api/certifications/${id}`).then(res => res.json())
        )).then(certLists => {
          const merged = data.map((g, i) => ({
            name: g.name,
            guide_id: g.guide_id,
            cert: certLists[i][0]?.certification_name || '—',
            expires: certLists[i][0]?.expiry_date || '—',
            id: certLists[i][0]?.id || null,
          }));
          setCertData(merged);
        });
      });
  }, []);

  const handleAssign = (index) => {
    if (!certification.trim()) return alert('Please enter certification name');

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const formattedExpiry = expiryDate.toISOString().split('T')[0];
    const selected = certData[index];

    const method = selected.id ? 'PUT' : 'POST';
    const url = selected.id
      ? `${BASE_URL}/api/certifications/${selected.id}`
      : `${BASE_URL}/api/certifications`;

    const body = selected.id
      ? { certification_name: certification, expiry_date: formattedExpiry, status: 'Valid' }
      : { guide_id: selected.guide_id, certification_name: certification, expiry_date: formattedExpiry };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(() => {
        const updated = [...certData];
        updated[index].cert = certification;
        updated[index].expires = formattedExpiry;
        setCertData(updated);
        setCertification('');
        alert('✅ Certification updated!');
      })
      .catch(err => {
        console.error('❌ Update failed:', err);
        alert('Failed to assign certification');
      });
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
                    value={certification}
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
