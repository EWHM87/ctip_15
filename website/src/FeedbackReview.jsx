import React, { useEffect, useState } from 'react';

const FeedbackReview = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchSummaries = () => {
    fetch('http://localhost:5000/api/feedback-summaries')
      .then(res => res.json())
      .then(data => setSummaries(data))
      .catch(err => {
        console.error('Fetch error:', err);
        setStatusMsg('⚠️ Failed to fetch summaries');
      });
  };

  const generateSummary = async () => {
    setLoading(true);
    setStatusMsg('🔄 Generating AI summary...');
    try {
      const res = await fetch('http://localhost:5000/api/generate-feedback-summary', {
        method: 'POST',
      });

      const data = await res.json();
      setStatusMsg(data.message || '✅ Summary generated');
      fetchSummaries(); // refresh
    } catch (err) {
      console.error(err);
      setStatusMsg('❌ Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Visitor Feedback Summaries</h2>

      <button onClick={generateSummary} disabled={loading}>
        {loading ? 'Generating...' : 'Generate New Summary'}
      </button>
      <p>{statusMsg}</p>

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

export default FeedbackReview;
