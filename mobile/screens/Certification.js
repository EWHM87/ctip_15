import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const MyCertifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Certifications</Text>
      <Text style={styles.text}>Track your certifications and qualifications here.</Text>
      {/* Later: show a list of achievements, expiry dates, etc. */}
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

export default MyCertifications;
