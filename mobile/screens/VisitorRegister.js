import React, { useState } from 'react';
import Constants from 'expo-constants';

import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert 
} from 'react-native';


const VisitorRegister = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = Constants.expoConfig?.extra?.API_URL ?? Constants.manifest?.extra?.API_URL;
  console.log('✅ API_URL:', API_URL);

const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  const url = `${API_URL}/api/register`;
  const payload = {
    username: name,
    email,
    password,
    role: 'visitor',
  };

  console.log('📤 Submitting to:', url);
  console.log('📦 Payload:', payload);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('✅ Server response:', data);

    if (response.ok) {
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('VisitorLogin');
    } else {
      Alert.alert('Error', data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    Alert.alert('Error', 'Server connection failed');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Visitor Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter UserID"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VisitorLogin')}>
          <Text style={styles.footerText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#065f46',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#065f46',
    fontSize: 16,
  },
});

export default VisitorRegister;
