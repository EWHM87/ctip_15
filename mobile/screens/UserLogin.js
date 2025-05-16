import React, { useState } from 'react';
import { API_URL } from '@env';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure this is imported!
import { CommonActions } from '@react-navigation/native';

const UserLogin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both username and password');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Success', 'Login successful');
        navigation.navigate('UserDashboard');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Server connection failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter ParkGuideId"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
              })
            );
          }}
        >
          <Text style={styles.footerText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
          <Text style={styles.footerText}>Don’t have an account? Register</Text>
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

export default UserLogin;
