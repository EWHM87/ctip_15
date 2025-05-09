import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const AdminNotifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.text}>View messages and alerts from administrators.</Text>
      {/* Later: integrate push notifications or list of messages */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default AdminNotifications;
