import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const RegisterUser = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'guide',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      Alert.alert('✅ Success', `${form.role} registered successfully.`);
      setForm({ username: '', email: '', password: '', role: 'guide' });
    } catch (err) {
      Alert.alert('❌ Error', err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Users</Text>

      <TextInput style={styles.input} placeholder="Username" value={form.username} onChangeText={(v) => handleChange('username', v)} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(v) => handleChange('email', v)} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={form.password} onChangeText={(v) => handleChange('password', v)} />

      <Text style={styles.pickerLabel}>Role:</Text>
      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, form.role === 'guide' && styles.selectedRole]}
          onPress={() => handleChange('role', 'guide')}
        >
          <Text style={styles.roleText}>Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, form.role === 'admin' && styles.selectedRole]}
          onPress={() => handleChange('role', 'admin')}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0fdf4', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#065f46', marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#065f46', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 16, backgroundColor: '#fff' },
  pickerLabel: { marginBottom: 6, fontWeight: 'bold' },
  roleSelector: { flexDirection: 'row', marginBottom: 16 },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedRole: {
    backgroundColor: '#10b981',
  },
  roleText: {
    color: '#065f46',
    fontWeight: 'bold',
  },
  button: { backgroundColor: '#10b981', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default RegisterUser;
