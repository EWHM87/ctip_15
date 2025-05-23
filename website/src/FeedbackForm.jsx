import React, { useState, useEffect } from 'react';
import './App.css'; // Optional: for custom styling

function FeedbackForm() {
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    visitorName: '',
    guideName: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // 1️⃣ On mount, load your guides
  useEffect(() => {
    fetch('http://localhost:5000/api/manage-guides', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch guides');
        return r.json();
      })
      .then(data => {
        // data should be [{ guide_id, name, … }, …]
        setGuides(data);
      })
      .catch(err => {
        console.error('❌ Could not load guides:', err);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // build payload exactly how your backend wants it
    const ratings = [
      +formData.q1,
      +formData.q2,
      +formData.q3,
      +formData.q4,
      +formData.q5,
      +formData.q6,
      +formData.q7,
    ];
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);

    const payload = {
      visitor_id: formData.visitorName,
      guide_id: parseInt(formData.guideName, 10),    // now the numeric id
      feedback_text: formData.q8,
      wildlife_rating: parseInt(formData.q1, 10),
      communication_rating: parseInt(formData.q2, 10),
      friendliness_rating: parseInt(formData.q3, 10),
      storytelling_rating: parseInt(formData.q4, 10),
      safety_rating: parseInt(formData.q5, 10),
      respect_rating: parseInt(formData.q6, 10),
      overall_rating: parseInt(formData.q7, 10),
      rating: averageRating
    };

    try {
      const res = await fetch('http://localhost:5000/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('❌ ' + err.message);
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
          <select
            name="guideName"
            value={formData.guideName}
            onChange={handleChange}
            required
          >
            <option value="">-- select a guide --</option>
            {guides.map(g => (
              <option key={g.guide_id} value={g.guide_id}>
                {g.name}
              </option>
            ))}
          </select>
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
        ].map(q => (
          <label key={q.name}>
            {q.label}
            <select
              name={q.name}
              value={formData[q.name]}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        ))}

        <label>
          8. Additional comments or suggestions
          <textarea
            name="q8"
            value={formData.q8}
            onChange={handleChange}
            placeholder="Your feedback helps us improve…"
          />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
