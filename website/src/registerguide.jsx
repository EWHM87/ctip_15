import React, { useState } from 'react';

function RegisterGuide() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'guide',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simulate delay (API call)
    setTimeout(() => {
      console.log('✅ Guide registered:', formData);

      // Optionally store in localStorage (demo)
      const prevGuides = JSON.parse(localStorage.getItem('registeredGuides')) || [];
      localStorage.setItem('registeredGuides', JSON.stringify([...prevGuides, formData]));

      setIsSubmitting(false);
      setMessage('✅ Guide registered successfully!');
      setFormData({ name: '', email: '', role: 'guide' });
    }, 1000);
  };

  return (
    <div className="container mt-4">
      <h2>➕ Register New Park Guide</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="guide">Guide</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Guide'}
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
}

export default RegisterGuide;
