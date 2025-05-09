import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';

const SendReminders = () => {
  const [guideName, setGuideName] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');

  const handleSend = () => {
    if (!guideName || !reminderMessage) {
      Alert.alert('Please fill in all fields.');
      return;
    }

    Alert.alert('Reminder Sent', `To: ${guideName}\nMessage: ${reminderMessage}`);
    setGuideName('');
    setReminderMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔔 Send Reminder</Text>

        <TextInput
          style={styles.input}
          placeholder="Park Guide Name"
          value={guideName}
          onChangeText={setGuideName}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Reminder Message"
          value={reminderMessage}
          onChangeText={setReminderMessage}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send Reminder</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SendReminders;
