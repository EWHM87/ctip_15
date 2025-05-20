import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, Button, Modal, Form
} from 'react-bootstrap';

export default function ManageGuides() {
  const [guides, setGuides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: ''
  });

  // fetch list on mount
  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const { data } = await axios.get('/api/manage-guides');
      setGuides(data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', email: '' });
    setShowModal(true);
  };

  const openEdit = guide => {
    setEditingId(guide.guide_id);
    setForm({ name: guide.name, email: guide.email });
    setShowModal(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this guide?')) return;
    try {
      await axios.delete(`/api/manage-guides/${id}`);
      setGuides(guides.filter(g => g.guide_id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(`/api/manage-guides/${editingId}`, form);
      } else {
        await axios.post('/api/manage-guides', form);
      }
      setShowModal(false);
      fetchGuides();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Park Guides</h2>
      <p>Admin can view, edit or delete guide accounts here.</p>

      <Button variant="primary" onClick={openAdd} className="mb-3">
        + Add New Guide
      </Button>

      <Table bordered hover>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Certification</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map(g => (
            <tr key={g.guide_id}>
              <td>{g.name}</td>
              <td>{g.email}</td>
              <td>{g.role || 'guide'}</td>
              <td>{g.certification_name || '—'}</td>
              <td>{g.expiry_date ? g.expiry_date.slice(0, 10) : '—'}</td>
              <td>{g.status || '—'}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => openEdit(g)}>
                  Edit
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(g.guide_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Guide' : 'Add Guide'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingId ? 'Save Changes' : 'Create Guide'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
