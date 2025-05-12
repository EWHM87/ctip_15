import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const AddGuide = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [contact, setContact] = useState('');

  const handleAdd = () => {
    // TODO: Connect to backend to store guide info
    alert('Guide added successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Guide</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Area of Expertise"
            style={styles.input}
            value={expertise}
            onChangeText={setExpertise}
          />
          <TextInput
            placeholder="Contact Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add Guide</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGuide;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ecfdf5' },
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#065f46', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
