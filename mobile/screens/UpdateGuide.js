import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const UpdateGuide = () => {
  const [guideId, setGuideId] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newExpertise, setNewExpertise] = useState('');

  const handleUpdate = () => {
    // TODO: Backend update logic here
    alert('Guide information updated!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Update Guide</Text>
        <View style={styles.card}>
          <TextInput
            placeholder="Guide ID"
            style={styles.input}
            value={guideId}
            onChangeText={setGuideId}
          />
          <TextInput
            placeholder="New Contact Number"
            style={styles.input}
            value={newContact}
            onChangeText={setNewContact}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="New Area of Expertise"
            style={styles.input}
            value={newExpertise}
            onChangeText={setNewExpertise}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Guide</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGuide;

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
