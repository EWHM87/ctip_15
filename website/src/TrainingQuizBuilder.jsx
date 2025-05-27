import React from 'react';
import { useParams } from 'react-router-dom';

function TrainingQuizBuilder() {
  const { scheduleId } = useParams();

  return (
    <div className="container mt-4">
      <h2>🧠 Take Training Quiz</h2>
      <p>Quiz for Training ID: {scheduleId}</p>
      {/* Fetch and show the quiz for this scheduleId here */}
    </div>
  );
}

export default TrainingQuizBuilder;
