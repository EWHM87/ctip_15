import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL } from '@env';

const API_URL = `${BACKEND_URL}/api/sensor-logs`;

const IoTMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('📡 Fetching IoT logs from:', API_URL);

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
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch sensor logs:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌿 IoT Species Monitor</Text>
        <Text style={styles.subtitle}>
          View species recently detected by motion/wildlife sensors in protected parks.
        </Text>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Species</Text>
          <Text style={styles.headerCell}>Time</Text>
          <Text style={styles.headerCell}>Temp (°C)</Text>
          <Text style={styles.headerCell}>Humidity</Text>
          <Text style={styles.headerCell}>Motion</Text>
        </View>

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
                styles.tableRow,
                entry.alert ? styles.alertRow : null
              ]}
            >
              <Text style={styles.cell}>{entry.species || entry.SpeciesType || 'Unknown'}</Text>
              <Text style={styles.cell}>
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
              <Text style={styles.cell}>
                {parseFloat(entry.temperature || entry.Temperature).toFixed(1)}°
              </Text>
              <Text style={styles.cell}>
                {parseFloat(entry.humidity || entry.Humidity).toFixed(1)}%
              </Text>
              <View style={styles.statusCell}>
                <Ionicons
                  name={entry.motion || entry.MotionDetected ? 'alert-circle' : 'checkmark-circle'}
                  size={16}
                  color={entry.motion || entry.MotionDetected ? '#dc2626' : '#22c55e'}
                />
                <Text
                  style={[
                    styles.statusText,
                    entry.motion || entry.MotionDetected ? styles.statusAlert : null
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
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d1fae5',
    padding: 10,
    borderRadius: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  alertRow: {
    backgroundColor: '#fee2e2',
  },
  cell: {
    flex: 1,
    color: '#1f2937',
    fontSize: 12,
  },
  statusCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 5,
    color: '#22c55e',
    fontSize: 12,
  },
  statusAlert: {
    color: '#dc2626',
  },
  noData: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 20,
    fontSize: 14,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default IoTMonitor;
