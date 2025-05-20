import React, { useEffect, useState } from 'react';
import { FaUser, FaYoutube, FaListOl, FaCheckCircle, FaSyncAlt, FaTrash } from 'react-icons/fa';

function AITrainingRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/ai-training-recommendations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          setError('Invalid data format from server');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load training recommendations');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleGenerate = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/generate-training-recommendations', {
        method: 'POST'
      });
      const data = await res.json();
      alert(data.message || 'Generated');
      fetchRecommendations();
    } catch (err) {
      console.error(err);
      alert('Error generating training suggestions');
    }
  };

  const handleClear = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/clear-training-recommendations', {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.message || 'Cleared');
      fetchRecommendations();
    } catch (err) {
      console.error(err);
      alert('Error clearing suggestions');
    }
  };

  const grouped = recommendations.reduce((acc, item) => {
    if (!acc[item.guide_id]) acc[item.guide_id] = [];
    acc[item.guide_id].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2>🎯 Personalized Training Suggestions</h2>

      <div className="d-flex justify-content-end gap-3 mb-3">
        <button className="btn btn-success" onClick={handleGenerate}><FaSyncAlt /> Generate</button>
        <button className="btn btn-danger" onClick={handleClear}><FaTrash /> Clear All</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {Object.entries(grouped).map(([guideId, trainings], index) => (
        <div key={index} className="card mb-4 p-3 shadow-sm">
          <h4><FaUser /> Guide: {guideId}</h4>
          {trainings.map((item, i) => (
            <div key={i} className="mt-2 p-3 border rounded bg-light">
              <h5><FaCheckCircle /> {item.topic}</h5>
              <p>
                <FaYoutube /> <a href={item.youtube} target="_blank" rel="noreferrer">Watch Training Video</a>
              </p>
              <p><FaListOl /> <strong>Steps to Improve:</strong></p>
              <ul>
                {item.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AITrainingRecommendations;
