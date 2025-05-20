import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Qualifications() {
  const [certData, setCertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certification, setCertification] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', expiry: '' });
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/api/manage-guides`)
      .then(res => res.json())
      .then(async (data) => {
        const certDetails = await Promise.all(
          data.map(g =>
            fetch(`${BASE_URL}/api/certifications/${g.guide_id}`)
              .then(res => res.json())
              .catch(() => [])
          )
        );

        const merged = data.map((g, i) => {
          const cert = certDetails[i][0];
          return {
            name: g.name,
            guide_id: g.guide_id,
            cert: cert?.certification_name || '—',
            expires: cert?.expiry_date || '—',
            id: cert?.id || cert?.certification_id || null // ✅ fallback support
          };
        });

        console.log('🧩 Merged certData:', merged); // ✅ Debugging line
        setCertData(merged);
        setLoading(false);
      });
  }, []);

  const handleAssign = (index) => {
    if (!certification.trim()) return alert('Please enter certification name');

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const formattedExpiry = expiryDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
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
        alert('✅ Certification assigned/updated!');
      })
      .catch(err => {
        console.error('❌ Update failed:', err);
        alert('Failed to assign certification');
      });
  };

  const openEdit = (index) => {
    const selected = certData[index];
    setEditIndex(index);
    setEditForm({
      name: selected.cert !== '—' ? selected.cert : '',
      expiry: selected.expires !== '—' ? selected.expires : '',
    });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const selected = certData[editIndex];
    if (!selected.id) return alert('No certification found to update');

    fetch(`${BASE_URL}/api/certifications/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        certification_name: editForm.name,
        expiry_date: new Date(editForm.expiry).toLocaleDateString('en-CA'),
        status: 'Valid'
      }),
    })
      .then(res => res.json())
      .then(() => {
        const updated = [...certData];
        updated[editIndex].cert = editForm.name;
        updated[editIndex].expires = editForm.expiry;
        setCertData(updated);
        setShowModal(false);
        alert('✅ Certification updated!');
      })
      .catch(err => {
        console.error('❌ Edit failed:', err);
        alert('Update failed');
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
            <th>Certification</th>
            <th>Expiry Date</th>
            <th>Assign New</th>
          </tr>
        </thead>
        <tbody>
          {certData.map((g, i) => (
            <tr key={i}>
              <td>{g.name}</td>
              <td>
                {g.cert}
                {/* ✅ Force render button regardless of id */}
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 ms-2 text-primary"
                  style={{ textDecoration: 'none' }}
                  onClick={() => openEdit(i)}
                >
                  ✏️
                </Button>
              </td>
              <td>
                {g.expires !== '—'
                  ? new Date(g.expires).toISOString().split('T')[0]
                  : '—'}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Eco Guiding"
                    value={certification}
                    onChange={(e) => setCertification(e.target.value)}
                  />
                  <Button
                    className="btn-sm"
                    variant="success"
                    onClick={() => handleAssign(i)}
                  >
                    ➕
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Certification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Certification Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={editForm.expiry}
                onChange={e => setEditForm(f => ({ ...f, expiry: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Qualifications;
