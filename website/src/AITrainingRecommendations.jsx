import React, { useEffect, useState } from 'react';
import { FaUser, FaYoutube, FaListOl, FaCheckCircle } from 'react-icons/fa';

function AITrainingRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/ai-training-recommendations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRecommendations(data);
        } else {
          setError('Invalid data format from server');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load training recommendations');
      });
  }, []);

  const grouped = recommendations.reduce((acc, item) => {
    if (!acc[item.guide_id]) acc[item.guide_id] = [];
    acc[item.guide_id].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2>🎯 Personalized Training Suggestions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
