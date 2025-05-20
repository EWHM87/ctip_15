import React, { useState, useEffect } from 'react';

function Qualifications() {
  const [certification, setCertification] = useState('');
  const [certData, setCertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/manage-guides`)
      .then(res => res.json())
      .then(async data => {
        const certDetails = await Promise.all(
          data.map(g =>
            fetch(`${BASE_URL}/api/certifications/${g.guide_id}`)
              .then(res => res.json())
              .catch(() => [])
          )
        );

        const merged = data.map((g, i) => ({
          name: g.name,
          guide_id: g.guide_id,
          cert: certDetails[i][0]?.certification_name || '—',
          expires: certDetails[i][0]?.expiry_date || '—',
          id: certDetails[i][0]?.id || null,
        }));

        setCertData(merged);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to load guide data:', err);
        setLoading(false);
      });
  }, []);

  const handleAssign = (index) => {
    const selected = certData[index];
    if (!certification.trim()) return alert('Please enter a certification name');

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const formattedExpiry = expiryDate.toISOString().split('T')[0];

    const isUpdate = !!selected.id;
    const url = isUpdate
      ? `${BASE_URL}/api/certifications/${selected.id}`
      : `${BASE_URL}/api/certifications`;
    const method = isUpdate ? 'PUT' : 'POST';
    const body = isUpdate
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
        alert('✅ Certification saved successfully!');
      })
      .catch(err => {
        console.error('❌ Certification assignment failed:', err);
        alert('Failed to assign certification.');
      });
  };

  if (loading) return <div className="container mt-4">Loading guide certifications...</div>;

  return (
    <div className="container mt-4">
      <h2>🎓 Guide Certifications</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Guide Name</th>
            <th>Current Certification</th>
            <th>Expiry Date</th>
            <th>Assign New</th>
          </tr>
        </thead>
        <tbody>
          {certData.map((g, i) => (
            <tr key={i}>
              <td>{g.name}</td>
              <td>{g.cert}</td>
              <td>{g.expires !== '—' ? new Date(g.expires).toISOString().split('T')[0] : '—'}</td>
              <td>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Eco Guiding"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAssign(i)}
                  >
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
