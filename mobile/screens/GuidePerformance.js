// GuidePerformance.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuidePerformance = () => {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const navigation = useNavigation();

  const goToTrainingRecommendations = () => {
    console.log("🔁 Navigating to Training Recommendations...");
    navigation.navigate('AITrainingRecommendations'); // Adjust screen name as per your navigator
  };

  const fetchSummaries = () => {
    // Replace 'localhost' with your server IP or domain accessible by the device
    fetch('http://YOUR_SERVER_IP:5000/api/feedback-summaries')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSummaries(data);
          setError('');
        } else {
          setError('Invalid data from server');
        }
      })
      .catch(() => setError('⚠️ Failed to fetch summaries'));
  };

  const generateSummaries = async () => {
    setLoading(true);
    setStatusMsg('Generating AI summaries...');
    try {
      const res = await fetch('http://YOUR_SERVER_IP:5000/api/generate-feedback-summary', {
        method: 'POST',
      });
      const data = await res.json();
      setStatusMsg(data.message || '✅ Summary generation complete');
      fetchSummaries();
    } catch (e) {
      setStatusMsg('❌ Failed to generate summaries');
    } finally {
      setLoading(false);
    }
  };

  const clearSummaries = async () => {
    setLoading(true);
    setStatusMsg('Clearing all summaries...');
    try {
      const res = await fetch('http://YOUR_SERVER_IP:5000/api/clear-feedback-summaries', {
        method: 'DELETE',
      });
      const data = await res.json();
      setStatusMsg(data.message || '✅ All summaries cleared');
      fetchSummaries();
    } catch (e) {
      setStatusMsg('❌ Failed to clear summaries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const grouped = summaries.reduce((acc, summary) => {
    const guideKey = summary.guide_name || summary.guide_id || 'Unknown Guide';
    if (!acc[guideKey]) acc[guideKey] = [];
    acc[guideKey].push(summary);
    return acc;
  }, {});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Visitor Feedback Summaries</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.generateBtn]}
          onPress={generateSummaries}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? '⚡ Generating...' : '⚡ Generate AI Summary'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearBtn]}
          onPress={clearSummaries}
          disabled={loading}
        >
          <Text style={styles.buttonText}>🗑️ Clear All Summaries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.viewBtn]}
          onPress={goToTrainingRecommendations}
        >
          <Text style={styles.buttonText}>✅ View Training Recommendations</Text>
        </TouchableOpacity>
      </View>

      {!!statusMsg && <Text style={styles.status}>{statusMsg}</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}

      {Object.entries(grouped).map(([guide, items]) => (
        <View key={guide} style={styles.card}>
          <Text style={styles.guideTitle}>👤 Guide: {guide}</Text>
          <Text style={styles.aiTitle}>🤖 AI Feedback Summary:</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.summaryBlock}>
              <Text style={styles.summaryText}>📋 Summary: {item.summary_text}</Text>
              <Text style={styles.summaryText}>😊 Sentiment: {item.sentiment}</Text>
              <Text style={styles.generatedAt}>⏰ Generated At: {new Date(item.generated_at).toLocaleString()}</Text>
            </View>
          ))}
        </View>
      ))}

      {loading && <ActivityIndicator size="large" color="#0d6efd" style={{ marginVertical: 20 }} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial', // Note: Not guaranteed on all platforms
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    margin: 5,
  },
  generateBtn: {
    backgroundColor: '#0d6efd',
  },
  clearBtn: {
    backgroundColor: '#dc3545',
  },
  viewBtn: {
    backgroundColor: '#20c997',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  status: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryBlock: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0d6efd',
    borderRadius: 4,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 3,
  },
  generatedAt: {
    fontSize: 12,
    color: '#555',
  },
});

export default GuidePerformance;
