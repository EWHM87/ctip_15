import React, { useEffect, useState } from 'react';

const FeedbackSummary = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback-summaries')
      .then(res => res.json())
      .then(data => setSummaries(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Visitor Feedback Summaries</h2>
      {summaries.length === 0 ? (
        <p>No summaries available.</p>
      ) : (
        <ul>
          {summaries.map((item, index) => (
            <li key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <strong>Summary:</strong> {item.summary_text}<br />
              <strong>Sentiment:</strong> {item.sentiment}<br />
              <small>Generated At: {new Date(item.generated_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackSummary;
