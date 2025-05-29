import React, { useEffect, useState } from 'react';

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/scheduletraining')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error('❌ Error fetching trainings:', err));
  }, []);

  const handlePreview = async (schedule_id) => {
    setPreviewLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/scheduletraining/${schedule_id}`);
      if (!response.ok) throw new Error('Failed to load details');
      const data = await response.json();
      setPreview(data);
    } catch {
      alert('❌ Failed to load preview.');
    }
    setPreviewLoading(false);
  };

  // Always open the Google Form link from quiz_link
  const handleTakeQuiz = (quizLink) => {
    if (quizLink) {
      window.open(quizLink, '_blank');
    } else {
      alert('❌ No quiz link provided for this training.');
    }
  };

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2>📚 Available Trainings</h2>
      <p className="text-muted">Accessible to guides and admins.</p>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Topic</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map(training => (
            <tr key={training.schedule_id}>
              <td>{training.topic}</td>
              <td>{formatDate(training.date)}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handlePreview(training.schedule_id)}
                  disabled={previewLoading}
                >
                  👁️ {previewLoading ? 'Loading...' : 'Preview'}
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleTakeQuiz(training.quiz_link)}
                  disabled={!training.quiz_link}
                >
                  📝 Take Quiz
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                    <a href={preview.manual_link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
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

export default Training;
