// GuideSelfAssessment.jsx
import React, { useState } from 'react';
import './App.css';

function GuideSelfAssessment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="thank-you">✅ Thank you for submitting your self-assessment!</div>;
  }

  return (
    <div className="guide-form-container">
      <h2>🧭 Park Guide Eligibility Self-Assessment</h2>
      <p>Please answer the questions below honestly to assess your eligibility to become a Park Guide at Semenggoh Wildlife Centre.</p>

      <form onSubmit={handleSubmit} className="guide-feedback-form">
        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <hr />

        <label>1. Do you have basic knowledge of Borneo's flora and fauna?
          <select name="q1" value={formData.q1} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>2. Are you comfortable guiding groups of people through jungle trails?
          <select name="q2" value={formData.q2} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>3. Are you fluent in either Bahasa Malaysia or English?
          <select name="q3" value={formData.q3} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>4. Are you able to commit to the full training program duration?
          <select name="q4" value={formData.q4} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>5. Do you have any prior experience in tourism or guiding?
          <select name="q5" value={formData.q5} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>6. Are you physically fit and capable of outdoor activities?
          <select name="q6" value={formData.q6} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>7. Why do you want to become a park guide at Semenggoh?
          <textarea name="q7" value={formData.q7} onChange={handleChange} required placeholder="Explain your motivation here..." />
        </label>

        <label>8. Do you have any concerns or needs we should be aware of?
          <textarea name="q8" value={formData.q8} onChange={handleChange} placeholder="(Optional)" />
        </label>

        <button type="submit">Submit Assessment</button>
      </form>
    </div>
  );
}

export default GuideSelfAssessment;
