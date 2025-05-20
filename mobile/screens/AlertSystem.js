import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlertSystem = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#065f46" />
        </TouchableOpacity>
        <Text style={styles.title}>Alert System</Text>
      </View>

      {/* Placeholder Content */}
      <View style={styles.card}>
        <Text style={styles.label}>🚨 Recent Alerts</Text>
        <Text style={styles.placeholder}>No alerts triggered yet.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📡 Sensor Status</Text>
        <Text style={styles.placeholder}>Awaiting real-time updates from IoT devices...</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔔 Notification Settings</Text>
        <Text style={styles.placeholder}>Coming soon: configure SMS/Email alerts.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    padding: 16,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    color: '#555',
  },
});

export default AlertSystem;
