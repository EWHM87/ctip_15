import React, { useState } from 'react';

function ScheduleTraining() {
  const [training, setTraining] = useState({ topic: '', date: '' });
  const [trainings, setTrainings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrainings(prev => [...prev, training]);
    setTraining({ topic: '', date: '' });
  };

  return (
    <div className="container mt-4">
      <h2>Schedule Training</h2>
      <form onSubmit={handleSubmit} className="mt-3 mb-4">
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" name="topic" className="form-control" placeholder="Training Topic" required value={training.topic} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input type="date" name="date" className="form-control" required value={training.date} onChange={handleChange} />
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
          {trainings.map((t, i) => (
            <tr key={i}>
              <td>{t.topic}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTraining;
