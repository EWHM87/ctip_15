import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const TrainingSignup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Training Sign-up</Text>
      <Text style={styles.text}>Here you can register for available training programs.</Text>
      {/* You can later add form inputs, checkboxes, and submission logic */}
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

export default TrainingSignup;
