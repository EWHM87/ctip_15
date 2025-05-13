import React, { useState, useEffect } from 'react';

function ScheduleTraining() {
  const [training, setTraining] = useState({ topic: '', date: '' });
  const [trainings, setTrainings] = useState([]);

  const loadTrainings = () => {
    fetch('http://localhost:5000/api/scheduletraining')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error('❌ Error fetching trainings:', err));
  };

  useEffect(() => {
    loadTrainings(); // ✅ load on mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/scheduletraining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Training scheduled successfully') {
        alert('✅ Training scheduled successfully!');
        setTraining({ topic: '', date: '' });
        loadTrainings(); // ✅ refresh from backend instead of relying on old state
      } else {
        alert(data.message || '❌ Failed to schedule training.');
      }
    } catch (err) {
      console.error('Error adding training:', err);
      alert('❌ Failed to schedule training.');
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2>🗓️ Schedule Training</h2>

      <form onSubmit={handleSubmit} className="mt-3 mb-4">
        <div className="row g-2">
          <div className="col-md-6">
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
          <div className="col-md-4">
            <input
              type="date"
              name="date"
              className="form-control"
              required
              value={training.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((t) => (
            <tr key={t.schedule_id}>
              <td>{t.topic}</td>
              <td>{formatDate(t.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTraining;
