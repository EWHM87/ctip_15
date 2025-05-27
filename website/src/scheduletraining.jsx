import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultTraining = {
  topic: '',
  date: '',
  description: '',
  manual_link: '',
  steps: [],
};

function ScheduleTraining() {
  const [training, setTraining] = useState(defaultTraining);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const navigate = useNavigate();

  // Load all trainings
  const loadTrainings = () => {
    fetch('http://localhost:5000/api/scheduletraining')
      .then(res => res.json())
      .then(data => setTrainings(Array.isArray(data) ? data : []))
      .catch(() => setTrainings([]));
  };

  useEffect(() => { loadTrainings(); }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining(prev => ({ ...prev, [name]: value }));
  };

  // Add training
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/scheduletraining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
      });
      const data = await response.json();
      if (response.ok && (data.message?.toLowerCase().includes('success'))) {
        alert('✅ Training scheduled successfully!');
        setTraining(defaultTraining);
        loadTrainings();
      } else {
        alert(data.message || '❌ Failed to schedule training.');
      }
    } catch (err) {
      alert('❌ Failed to schedule training.');
    }
    setLoading(false);
  };

  // Delete training
  const handleDelete = async (schedule_id) => {
    if (!window.confirm('Are you sure you want to delete this training?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/scheduletraining/${schedule_id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok && (data.message?.toLowerCase().includes('deleted'))) {
        setTrainings(prev => prev.filter(t => t.schedule_id !== schedule_id));
        alert('✅ Training deleted.');
      } else {
        alert(data.message || '❌ Failed to delete.');
      }
    } catch (err) {
      alert('❌ Failed to delete.');
    }
  };

  // Load details when Preview is clicked
  const handlePreview = async (schedule_id) => {
    setPreviewLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/scheduletraining/${schedule_id}`);
      if (!response.ok) throw new Error('Failed to load details');
      const data = await response.json();
      // Support steps: parse if it's a JSON string
      if (data.steps && typeof data.steps === 'string') {
        try { data.steps = JSON.parse(data.steps); } catch { data.steps = []; }
      }
      setPreview(data);
    } catch (err) {
      alert('❌ Failed to load preview.');
    }
    setPreviewLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const statusBadge = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    const trainingDate = new Date(dateStr);
    return trainingDate >= today
      ? <span className="badge bg-info ms-1">Upcoming</span>
      : <span className="badge bg-success ms-1">Completed</span>;
  };

  const handleTakeQuiz = (schedule_id) => {
    navigate(`/quiz/${schedule_id}`);
  };

  return (
    <div className="container mt-4">
      <h2>🗓️ Schedule Training</h2>
      {/* Add Training Form */}
      <form onSubmit={handleSubmit} className="mt-3 mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-md-3">
            <input
              type="text"
              name="topic"
              className="form-control"
              placeholder="Training Topic"
              required
              value={training.topic}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="date"
              className="form-control"
              required
              value={training.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description (optional)"
              value={training.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="url"
              name="manual_link"
              className="form-control"
              placeholder="Manual/Resource Link (optional)"
              value={training.manual_link}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <button
              className="btn btn-success w-100"
              disabled={!training.topic || !training.date || loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      {/* Trainings Card Grid */}
      <div className="row">
        {trainings.length === 0 ? (
          <div className="col-12 text-center text-muted">No trainings scheduled.</div>
        ) : (
          trainings.map(t => (
            <div key={t.schedule_id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{t.topic} {statusBadge(t.date)}</h5>
                  <div className="mb-2"><strong>Date:</strong> {formatDate(t.date)}</div>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handlePreview(t.schedule_id)}
                      disabled={previewLoading}
                    >
                      👁️ {previewLoading ? "Loading..." : "Preview"}
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleTakeQuiz(t.schedule_id)}
                    >
                      📝 Take Quiz
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(t.schedule_id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Training Preview</h5>
                <button type="button" className="btn-close" onClick={() => setPreview(null)} />
              </div>
              <div className="modal-body">
                <h5>{preview.topic}</h5>
                <div><strong>Date:</strong> {formatDate(preview.date)}</div>
                {preview.description && (
                  <div className="mb-2"><strong>Description:</strong> {preview.description}</div>
                )}
                {preview.manual_link && (
                  <div className="mb-2">
                    <strong>Manual/Resource:</strong>
                    <a href={preview.manual_link} target="_blank" rel="noopener noreferrer" className="btn btn-link ms-2">
                      📄 Open Resource/Manual
                    </a>
                  </div>
                )}
                {preview.steps && Array.isArray(preview.steps) && preview.steps.length > 0 && (
                  <div>
                    <strong>Training Steps:</strong>
                    <ol>
                      {preview.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setPreview(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleTraining;
