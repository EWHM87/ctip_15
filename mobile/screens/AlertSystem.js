import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BACKEND_URL } from '@env';

const API_URL = `${BACKEND_URL}/api/alerts`;

const AlertSystem = ({ navigation }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ALERTS_PER_PAGE = 3;

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setAlerts(data || []);
    } catch (err) {
      console.warn('❌ Failed to load alerts:', err.message);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const totalPages = Math.ceil(alerts.length / ALERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * ALERTS_PER_PAGE;
  const currentAlerts = alerts.slice(startIndex, startIndex + ALERTS_PER_PAGE);

  const changePage = (dir) => {
    const nextPage = currentPage + dir;
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#065f46" />
        </TouchableOpacity>
        <Text style={styles.title}>Alert System</Text>
      </View>

      <View style={styles.refreshRow}>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchAlerts}>
          <Ionicons name="refresh" size={20} color="#065f46" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#065f46" style={{ marginTop: 30 }} />
      ) : currentAlerts.length === 0 ? (
        <Text style={styles.empty}>No alerts triggered yet.</Text>
      ) : (
        currentAlerts.map((alert, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.time}>
              <Ionicons name="time" size={16} /> {alert.timestamp}
            </Text>
            {alert.screenshot && (
              <Image
                source={{ uri: `${BACKEND_URL}${alert.screenshot}` }}
                style={styles.snapshot}
                resizeMode="cover"
              />
            )}
          </View>
        ))
      )}

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={styles.pageBtn}
            onPress={() => changePage(-1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageText}>◀ Prev</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            Page {currentPage} / {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.pageBtn}
            onPress={() => changePage(1)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageText}>Next ▶</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#065f46',
  },
  refreshRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  refreshText: {
    color: '#065f46',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  time: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 10,
    fontWeight: '600',
  },
  snapshot: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  pageBtn: {
    padding: 10,
  },
  pageText: {
    color: '#065f46',
    fontWeight: 'bold',
  },
  pageInfo: {
    color: '#111',
    fontWeight: '600',
  },
});

export default AlertSystem;

