import React, { useState } from 'react';
import './App.css'; // Ensure CSS includes ff-visitor styles

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
    console.log(formData); // This will be posted to backend later
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="thank-you">✅ Thank you for your feedback!</div>;
  }

  return (
    <div className="ff-visitor-container">
      <h2>📝 Park Guide Visitor Feedback Form</h2>
      <form onSubmit={handleSubmit} className="ff-visitor-form">
        <label>
          Visitor Name:
          <input type="text" name="visitorName" value={formData.visitorName} onChange={handleChange} required />
        </label>

        <label>
          Guide Name:
          <input type="text" name="guideName" value={formData.guideName} onChange={handleChange} required />
        </label>

        <hr />
        <p>Please rate the following aspects of your guide’s performance (1 = Poor, 5 = Excellent):</p>

        <label>1. Knowledge of wildlife and biodiversity
          <select name="q1" value={formData.q1} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>2. Communication clarity and confidence
          <select name="q2" value={formData.q2} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>3. Friendliness and professionalism
          <select name="q3" value={formData.q3} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>4. Engagement and storytelling skills
          <select name="q4" value={formData.q4} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>5. Adherence to safety procedures
          <select name="q5" value={formData.q5} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>6. Respect shown to wildlife and environment
          <select name="q6" value={formData.q6} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>7. Overall visitor satisfaction
          <select name="q7" value={formData.q7} onChange={handleChange} required>
            <option value="">Select</option>{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>8. Additional comments or suggestions
          <textarea
            name="q8"
            value={formData.q8}
            onChange={handleChange}
            placeholder="Your feedback helps us improve..."
          />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
