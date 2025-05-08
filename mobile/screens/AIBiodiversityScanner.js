import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const BiodiversityScanner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Biodiversity Scanner</Text>
      <Text style={styles.text}>Scan plants and animals to identify species using AI.</Text>
      {/* Future: integrate image upload or camera for scanning */}
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

export default BiodiversityScanner;
