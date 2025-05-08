import React, { useState } from 'react';
import AuthService from './auth';

const dummyTrainings = [
  { id: 1, topic: 'Eco-tourism Basics', date: '2024-05-15' },
  { id: 2, topic: 'Wildlife Handling', date: '2024-06-10' },
  { id: 3, topic: 'Flora Protection', date: '2024-07-01' },
];

function Training() {
  const role = AuthService.getRole();
  const [signedUp, setSignedUp] = useState([]);

  const handleSignup = (id) => {
    if (!signedUp.includes(id)) {
      setSignedUp(prev => [...prev, id]);
      alert('✅ Signed up successfully!');
    }
  };

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2>📚 Available Trainings</h2>
      <p className="text-muted">Only accessible to guides and admins.</p>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Topic</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyTrainings.map(training => (
            <tr key={training.id}>
              <td>{training.topic}</td>
              <td>{formatDate(training.date)}</td>
              <td>
                <button
                  className={`btn btn-sm ${signedUp.includes(training.id) ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => handleSignup(training.id)}
                  disabled={signedUp.includes(training.id)}
                >
                  {signedUp.includes(training.id) ? '✔️ Signed Up' : 'Sign Up'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signed up summary */}
      {role === 'guide' && signedUp.length > 0 && (
        <div className="alert alert-success mt-4">
          <strong>You're registered for:</strong>
          <ul className="mt-2">
            {signedUp.map(id => {
              const session = dummyTrainings.find(t => t.id === id);
              return <li key={id}>{session.topic} on {formatDate(session.date)}</li>;
            })}
          </ul>
        </div>
      )}

      {/* Admin view */}
      {role === 'admin' && (
        <div className="alert alert-info mt-4">
          📊 <strong>Admin:</strong> Training sign-up tracking will be available in the final system dashboard.
        </div>
      )}
    </div>
  );
}

export default Training;
