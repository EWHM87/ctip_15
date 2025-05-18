import React, { useEffect, useState } from 'react';
import {
  FaUser, FaRobot, FaClipboardList, FaSmile, FaClock, FaBolt, FaTrash
} from 'react-icons/fa';

const FeedbackReview = () => {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Fetch summaries from backend
  const fetchSummaries = () => {
    fetch('http://localhost:5000/api/feedback-summaries')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSummaries(data);
        else setError('Invalid data from server');
      })
      .catch(() => setError('⚠️ Failed to fetch summaries'));
  };

  // Trigger Python summarisation
  const generateSummaries = async () => {
    setLoading(true);
    setStatusMsg('Generating AI summaries...');
    try {
      const res = await fetch('http://localhost:5000/api/generate-feedback-summary', { method: 'POST' });
      const data = await res.json();
      setStatusMsg(data.message || '✅ Summary generation complete');
      fetchSummaries(); // Refresh
    } catch {
      setStatusMsg('❌ Failed to generate summaries');
    } finally {
      setLoading(false);
    }
  };

  // Delete all summaries
  const clearSummaries = async () => {
    setLoading(true);
    setStatusMsg('Clearing all summaries...');
    try {
      const res = await fetch('http://localhost:5000/api/clear-feedback-summaries', { method: 'DELETE' });
      const data = await res.json();
      setStatusMsg(data.message || '✅ All summaries cleared');
      fetchSummaries();
    } catch {
      setStatusMsg('❌ Failed to clear summaries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  // Group summaries by guide
  const grouped = summaries.reduce((acc, summary) => {
    const guideKey = summary.guide_name || summary.guide_id || 'Unknown Guide';
    if (!acc[guideKey]) acc[guideKey] = [];
    acc[guideKey].push(summary);
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <h2>📝 Visitor Feedback Summaries</h2>

      <div style={styles.controls}>
        <button onClick={generateSummaries} disabled={loading} style={styles.generateBtn}>
          <FaBolt /> {loading ? 'Generating...' : 'Generate AI Summary'}
        </button>
        <button onClick={clearSummaries} disabled={loading} style={styles.clearBtn}>
          <FaTrash /> Clear All Summaries
        </button>
        {statusMsg && <p style={styles.status}>{statusMsg}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>

      {/* Display grouped summaries */}
      {Object.entries(grouped).map(([guide, items]) => (
        <div key={guide} style={styles.card}>
          <h3><FaUser /> Guide: {guide}</h3>
          <h4><FaRobot /> AI Feedback Summary:</h4>
          {items.map((item, index) => (
            <div key={index} style={styles.summaryBlock}>
              <p><FaClipboardList /> <strong>Summary:</strong> {item.summary_text}</p>
              <p><FaSmile /> <strong>Sentiment:</strong> {item.sentiment}</p>
              <p><FaClock /> <small>Generated At: {new Date(item.generated_at).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  controls: {
    marginBottom: '1.5rem'
  },
  generateBtn: {
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#0d6efd',
    border: 'none',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  clearBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    border: 'none',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  status: {
    color: '#007bff',
    marginTop: '0.5rem'
  },
  error: {
    color: 'red',
    marginTop: '0.5rem'
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    marginBottom: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  summaryBlock: {
    background: '#f8f9fa',
    padding: '1rem',
    borderLeft: '4px solid #0d6efd',
    borderRadius: '4px',
    marginBottom: '1rem'
  }
};

export default FeedbackReview;
