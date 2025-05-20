import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL } from '@env';

const API_URL = `${BACKEND_URL}/api/sensor-logs`;

const IoTMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLogs = () => {
    setLoading(true);
    fetch(API_URL)
      .then(async (res) => {
        const contentType = res.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`❌ Server error: ${text}`);
        }

        if (!isJson) {
          const text = await res.text();
          throw new Error(`❌ Expected JSON but got: ${text}`);
        }

        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort((a, b) => (b.id || 0) - (a.id || 0));
        setLogs(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch sensor logs:', err.message);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>🌿 IoT Species Monitor</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={fetchLogs}>
            <Ionicons name="refresh" size={20} color="#065f46" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          View species recently detected by motion/wildlife sensors in protected parks.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#065f46" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : logs.length === 0 ? (
          <Text style={styles.noData}>No sensor data available.</Text>
        ) : (
          logs.map((entry, index) => (
            <View
              key={index}
              style={[
                styles.card,
                entry.motion || entry.MotionDetected ? styles.alertCard : null
              ]}
            >
              <Text style={styles.label}>
                <Text style={styles.key}>#ID:</Text> {entry.id || '—'}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>Species:</Text> {entry.species || entry.SpeciesType || 'Unknown'}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>Time:</Text>{' '}
                {new Date(entry.time || entry.ReadingTime).toLocaleString('en-MY', {
                  timeZone: 'Asia/Kuala_Lumpur',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>Temperature:</Text> {parseFloat(entry.temperature || entry.Temperature).toFixed(1)}°C
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>Humidity:</Text> {parseFloat(entry.humidity || entry.Humidity).toFixed(1)}%
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>Soil Moisture:</Text> {entry.soil || entry.SoilMoisture || '—'}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.key}>SolarStatus:</Text> {entry.sun || entry.SolarStatus || '—'}
              </Text>
                
              <View style={styles.motionRow}>
                <Ionicons
                  name={entry.motion || entry.MotionDetected ? 'alert-circle' : 'checkmark-circle'}
                  size={16}
                  color={entry.motion || entry.MotionDetected ? '#dc2626' : '#22c55e'}
                />
                <Text
                  style={[
                    styles.statusText,
                    entry.motion || entry.MotionDetected ? styles.statusAlert : styles.statusNormal
                  ]}
                >
                  {entry.motion || entry.MotionDetected ? 'Alert' : 'Normal'}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  refreshText: {
    color: '#065f46',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  alertCard: {
    backgroundColor: '#fef2f2',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  key: {
    fontWeight: 'bold',
    color: '#065f46',
  },
  motionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  statusNormal: {
    color: '#10b981',
  },
  statusAlert: {
    color: '#dc2626',
  },
  noData: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#9ca3af',
  },
  errorText: {
    textAlign: 'center',
    color: '#dc2626',
    fontSize: 14,
    marginTop: 20,
  },
});

export default IoTMonitor;
