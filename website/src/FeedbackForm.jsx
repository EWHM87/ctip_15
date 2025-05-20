import React, { useState } from 'react';
import './App.css'; // Optional: for custom styling

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert string ratings to integers
    const ratings = [
      parseInt(formData.q1),
      parseInt(formData.q2),
      parseInt(formData.q3),
      parseInt(formData.q4),
      parseInt(formData.q5),
      parseInt(formData.q6),
      parseInt(formData.q7)
    ];
    const averageRating = (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(2);

    const payload = {
      visitor_id: formData.visitorName,
      guide_id: formData.guideName,
      feedback_text: formData.q8,
      wildlife_rating: parseInt(formData.q1),
      communication_rating: parseInt(formData.q2),
      friendliness_rating: parseInt(formData.q3),
      storytelling_rating: parseInt(formData.q4),
      safety_rating: parseInt(formData.q5),
      respect_rating: parseInt(formData.q6),
      overall_rating: parseInt(formData.q7),
      rating: averageRating
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const err = await response.json();
        alert('❌ Submission failed: ' + err.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('❌ Network or server error.');
    }
  };

  if (submitted) {
    return <div className="thank-you">✅ Thank you for your feedback!</div>;
  }

  return (
    <div className="ff-visitor-container" style={{ padding: '2rem' }}>
      <h2>📝 Park Guide Visitor Feedback Form</h2>
      <form onSubmit={handleSubmit} className="ff-visitor-form">
        <label>
          Visitor Name:
          <input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Guide Name:
          <input
            type="text"
            name="guideName"
            value={formData.guideName}
            onChange={handleChange}
            required
          />
        </label>

        <hr />
        <p>Please rate the following aspects of your guide’s performance (1 = Poor, 5 = Excellent):</p>

        {[
          { name: 'q1', label: '1. Knowledge of wildlife and biodiversity' },
          { name: 'q2', label: '2. Communication clarity and confidence' },
          { name: 'q3', label: '3. Friendliness and professionalism' },
          { name: 'q4', label: '4. Engagement and storytelling skills' },
          { name: 'q5', label: '5. Adherence to safety procedures' },
          { name: 'q6', label: '6. Respect shown to wildlife and environment' },
          { name: 'q7', label: '7. Overall visitor satisfaction' }
        ].map((q) => (
          <label key={q.name}>
            {q.label}
            <select
              name={q.name}
              value={formData[q.name]}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        ))}

        <label>
          8. Additional comments or suggestions
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
