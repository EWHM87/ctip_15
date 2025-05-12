import React, { useEffect, useState } from 'react';
import AuthService from './auth';

function Training() {
  const role = AuthService.getRole();
  const guideId = AuthService.getUserId();
  const [trainings, setTrainings] = useState([]);
  const [signedUp, setSignedUp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/scheduletraining') 
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error('❌ Error fetching trainings:', err));
  }, []);

  const handleSignup = (schedule_id) => {
    console.log('➡️  handleSignup called');
    console.log('   Signing up for schedule_id:', schedule_id);
    console.log('   Guide ID:', guideId);  // Add this
    console.log('   Schedule ID:', schedule_id); // Add this
    console.log('   Request body:', JSON.stringify({ guide_id: guideId, schedule_id }));

    fetch('http://localhost:5000/api/guide-training', {  
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guide_id: guideId, schedule_id })
    })
      .then(res => {
        if (!res.ok) throw new Error('Signup failed');
        setSignedUp(prev => [...prev, schedule_id]);
        alert('✅ Signed up successfully!');
      })
      .catch(err => {
        console.error('❌ Signup error:', err);
        alert('Failed to sign up. Please try again.');
      });
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
          {trainings.map(training => (
            <tr key={training.schedule_id}>
              <td>{training.topic}</td>
              <td>{formatDate(training.date)}</td>
              <td>
                <button
                  className={`btn btn-sm ${signedUp.includes(training.schedule_id) ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => handleSignup(training.schedule_id)}
                  disabled={signedUp.includes(training.schedule_id)}
                >
                  {signedUp.includes(training.schedule_id) ? '✔️ Signed Up' : 'Sign Up'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {role === 'guide' && signedUp.length > 0 && (
        <div className="alert alert-success mt-4">
          <strong>You're registered for:</strong>
          <ul className="mt-2">
            {signedUp.map(id => {
              const session = trainings.find(t => t.schedule_id === id);
              return <li key={id}>{session?.topic} on {formatDate(session?.date)}</li>;
            })}
          </ul>
        </div>
      )}

      {role === 'admin' && (
        <div className="alert alert-info mt-4">
          📊 <strong>Admin:</strong> Training sign-up tracking will be available in the final system dashboard.
        </div>
      )}
    </div>
  );
}

export default Training;