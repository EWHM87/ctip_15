// FeedbackForm.jsx
import React, { useState } from 'react';
import './App.css'; // Include your CSS styles here

function FeedbackForm() {
  const [formData, setFormData] = useState({
    visitorName: '',
    guideName: '',
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
    return <div className="thank-you">Thank you for your feedback!</div>;
  }

  return (
    <div className="feedback-form-container">
      <h2>📝 Semenggoh Wildlife Centre Feedback Form</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Visitor Name:
          <input type="text" name="visitorName" value={formData.visitorName} onChange={handleChange} required />
        </label>

        <label>
          Guide Name:
          <input type="text" name="guideName" value={formData.guideName} onChange={handleChange} required />
        </label>

        <hr />
        <p>Please rate the following on a scale of 1 (Poor) to 5 (Excellent):</p>

        <label>1. How informative was the guide about orangutan behavior?
          <select name="q1" value={formData.q1} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>2. Was the guide respectful toward the wildlife and environment?
          <select name="q2" value={formData.q2} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>3. Did the guide communicate clearly and answer questions effectively?
          <select name="q3" value={formData.q3} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>4. How well did the guide manage the group during the visit?
          <select name="q4" value={formData.q4} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>5. Was the safety information provided adequate and helpful?
          <select name="q5" value={formData.q5} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>6. How satisfied are you with the overall tour experience?
          <select name="q6" value={formData.q6} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>7. How would you rate the cleanliness and facilities of the park?
          <select name="q7" value={formData.q7} onChange={handleChange} required>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>8. Any suggestions or comments?
          <textarea name="q8" value={formData.q8} onChange={handleChange} placeholder="Write your comments here..." />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
