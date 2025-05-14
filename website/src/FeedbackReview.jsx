import React, { useEffect, useState } from 'react';

function FeedbackReview() {
  const [latestSummary, setLatestSummary] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback-summaries')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setLatestSummary(data[0]); // Most recent summary
        }
      })
      .catch((err) => console.error('Error fetching summaries:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 Visitor Feedback Summary Review</h2>
      {!latestSummary ? (
        <p>No feedback summaries available yet.</p>
      ) : (
        <div className="card mb-3 p-3 shadow-sm">
          <p><strong>🕒 Generated At:</strong> {new Date(latestSummary.generated_at).toLocaleString()}</p>
          <p><strong>📝 Summary:</strong> {latestSummary.summary_text}</p>
          <p><strong>📊 Sentiment:</strong> {latestSummary.sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackReview;
