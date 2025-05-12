import React, { useState, useEffect } from 'react';

function ScheduleTraining() {
  const [training, setTraining] = useState({ topic: '', date: '' });
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('/api/scheduletraining')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error('❌ Error fetching trainings:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => { // make it async if you want to use await
  e.preventDefault();
  console.log(training); // Your training state: { topic: '', date: '' }

  try {
    const response = await fetch('http://localhost:5000/api/scheduletraining', { //  <-- USE THIS URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training), //  <-- Make sure to send your 'training' state data
    });

    const data = await response.json(); // Assuming the server always sends JSON

    if (response.ok && data.message === 'Training scheduled successfully') { // Check response.ok for status 200-299
      alert('✅ Training scheduled successfully!');
      setTrainings(prev => [...prev, { ...training, schedule_id: data.schedule_id }]);
      setTraining({ topic: '', date: '' }); // Reset form
    } else {
      // More specific error handling based on response
      const errorMessage = data.message || '❌ Failed to schedule training. Server responded with an error.';
      alert(errorMessage);
      console.error('Server error:', data);
    }
  } catch (err) {
    console.error('Error adding training:', err);
    alert('❌ Failed to schedule training. Network error or server unreachable.');
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
