// RegisterGuide.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const RegisterGuide = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert('Guide Registered', `${form.name} has been registered.`);
    setForm({ name: '', email: '', phone: '', expertise: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register New Guide</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={form.name} onChangeText={(v) => handleChange('name', v)} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(v) => handleChange('email', v)} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={form.phone} onChangeText={(v) => handleChange('phone', v)} />
      <TextInput style={styles.input} placeholder="Area of Expertise" value={form.expertise} onChangeText={(v) => handleChange('expertise', v)} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Guide</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#ecfdf5', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#065f46', marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#065f46', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 16, backgroundColor: '#fff' },
  button: { backgroundColor: '#10b981', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default RegisterGuide;
