//training_recommendations
const fs = require('fs');
const path = require('path');

app.get('/api/ai-training-recommendations', (req, res) => {
  const filePath = path.join(__dirname, 'Backend', 'ai_training_output.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error reading AI training file:', err);
      return res.status(500).json({ message: 'Failed to load recommendations' });
    }

    try {
      const parsed = JSON.parse(data);
      res.status(200).json(parsed);
    } catch (parseErr) {
      res.status(500).json({ message: 'Invalid JSON format' });
    }
  });
});
