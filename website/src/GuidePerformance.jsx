import React, { useEffect, useState } from 'react';
import AuthService from './auth';

const GuidePerformance = () => {
  const [guideData, setGuideData] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const role = AuthService.getRole();

  useEffect(() => {
    // Adjusted dummy data using feedback structure from visitor form
    const dummyGuides = [
      {
        id: 'g1',
        name: 'Alice Lee',
        email: 'alice@semenggoh.org',
        averageRating: (5 + 5 + 5 + 4 + 4 + 5 + 5) / 7,
        feedback: [
          {
            comment: 'Alice had deep knowledge of wildlife and handled safety very professionally.',
            ratings: { q1: 5, q2: 5, q3: 5, q4: 4, q5: 4, q6: 5, q7: 5 }
          },
          {
            comment: 'Very clear and polite. Great storytelling about the orangutans!',
            ratings: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 4, q6: 5, q7: 5 }
          },
          {
            comment: 'Amazing experience! Will recommend her to others.',
            ratings: { q1: 5, q2: 4, q3: 5, q4: 4, q5: 5, q6: 5, q7: 5 }
          }
        ]
      },
      {
        id: 'g2',
        name: 'Budi Ramli',
        email: 'budi@semenggoh.org',
        averageRating: (3 + 4 + 4 + 3 + 3 + 4 + 4) / 7,
        feedback: [
          {
            comment: 'Budi was friendly but didn’t explain much about the animals.',
            ratings: { q1: 3, q2: 4, q3: 4, q4: 3, q5: 3, q6: 4, q7: 4 }
          },
          {
            comment: 'The group felt a bit rushed and hard to follow.',
            ratings: { q1: 3, q2: 3, q3: 4, q4: 2, q5: 3, q6: 3, q7: 3 }
          },
          {
            comment: 'Decent guide but room for improvement.',
            ratings: { q1: 4, q2: 4, q3: 3, q4: 4, q5: 4, q6: 3, q7: 4 }
          }
        ]
      },
      {
        id: 'g3',
        name: 'Chen Mei',
        email: 'chen@semenggoh.org',
        averageRating: (4 + 5 + 5 + 4 + 4 + 5 + 4) / 7,
        feedback: [
          {
            comment: 'Chen was engaging and had great environmental awareness.',
            ratings: { q1: 4, q2: 5, q3: 5, q4: 4, q5: 4, q6: 5, q7: 4 }
          },
          {
            comment: 'Very knowledgeable, but could slow down a bit.',
            ratings: { q1: 4, q2: 4, q3: 5, q4: 3, q5: 4, q6: 4, q7: 4 }
          },
          {
            comment: 'Really appreciated her passion for conservation!',
            ratings: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 4, q6: 5, q7: 5 }
          }
        ]
      }
    ];

    setGuideData(dummyGuides);
  }, []);

  const fetchRecommendations = (guideId) => {
    const dummyAI = {
      g1: ['Continue leading eco-tourism sessions', 'Offer mentoring to new guides'],
      g2: ['Retake biodiversity basics', 'Improve group pacing and storytelling'],
      g3: ['Practice pacing and simplify explanations for visitors']
    };

    setRecommendations(dummyAI[guideId] || []);
  };

  if (role !== 'admin') {
    return (
      <div className="container mt-4">
        <h3>❌ Access Denied</h3>
        <p>This page is for administrators only.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>📊 Guide Performance Overview</h2>
      <p>Monitor visitor feedback and use AI to personalize training suggestions for each park guide.</p>

      <div className="row">
        {guideData.map((guide) => (
          <div className="col-md-6 mb-4" key={guide.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="gp-card-title">{guide.name}</h5>
                <p className="gp-card-text">
                  <strong>Email:</strong> {guide.email}<br />
                  <strong>Avg. Rating:</strong> ⭐ {guide.averageRating.toFixed(1)} / 5
                </p>

                <h6 className="mt-3">🗣️ Visitor Feedback:</h6>
                <ul className="gp-feedback-list">
                  {guide.feedback.length > 0 ? (
                    guide.feedback.slice(0, 3).map((f, idx) => (
                      <li className="gp-feedback-item" key={idx}>
                        "{f.comment}"
                      </li>
                    ))
                  ) : (
                    <li className="text-muted gp-feedback-item">No feedback available.</li>
                  )}
                </ul>

                <button
                  className="btn btn-sm btn-outline-success w-100 mt-2"
                  onClick={() => {
                    setSelectedGuide(guide);
                    fetchRecommendations(guide.id);
                  }}
                >
                  🎯 View AI Training Suggestions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGuide && (
        <div className="mt-5">
          <h4>🎯 AI Training Suggestions for <span className="text-success">{selectedGuide.name}</span></h4>
          {recommendations.length > 0 ? (
            <ul className="list-group">
              {recommendations.map((rec, idx) => (
                <li className="list-group-item gp-list-group-item" key={idx}>✅ {rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No suggestions available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GuidePerformance;
