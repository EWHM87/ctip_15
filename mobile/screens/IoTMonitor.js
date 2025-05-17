// IoTMonitor.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockData = [
  { location: 'Semenggoh', species: 'Orangutan', time: '2024-05-06 07:45', status: 'Normal' },
  { location: 'Gunung Mulu', species: 'Hornbill', time: '2024-05-06 09:10', status: 'Normal' },
  { location: 'Bako', species: 'Civet', time: '2024-05-06 10:05', status: 'Alert' },
];

const IoTMonitor = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌿 IoT Species Monitor</Text>
        <Text style={styles.subtitle}>View species recently detected by motion/wildlife sensors in protected parks.</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Location</Text>
          <Text style={styles.headerCell}>Species</Text>
          <Text style={styles.headerCell}>Detected Time</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>

        {mockData.map((row, index) => (
          <View
            key={index}
            style={[styles.tableRow, row.status === 'Alert' && styles.alertRow]}
          >
            <Text style={styles.cell}>{row.location}</Text>
            <Text style={styles.cell}>{row.species}</Text>
            <Text style={styles.cell}>{row.time}</Text>
            <View style={styles.statusCell}>
              <Ionicons
                name={row.status === 'Alert' ? 'warning' : 'checkmark-circle'}
                size={16}
                color={row.status === 'Alert' ? '#dc2626' : '#22c55e'}
              />
              <Text style={[styles.statusText, row.status === 'Alert' && styles.statusAlert]}>
                {row.status}
              </Text>
            </View>
          </View>
        ))}
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
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#111827',
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
  },
  statusCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 5,
    color: '#22c55e',
  },
  statusAlert: {
    color: '#dc2626',
  },
});

export default IoTMonitor;