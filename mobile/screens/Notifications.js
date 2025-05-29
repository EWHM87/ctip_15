import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/notifications/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const text = await res.text();

      try {
        const json = JSON.parse(text);
        setMessages(json);
      } catch (err) {
        console.error('❌ JSON error:', err);
        console.log('⚠️ Raw response:', text);
        Alert.alert('Error', 'Failed to load notifications.');
      }

    } catch (err) {
      console.error('❌ Network error:', err);
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.messageCard}>
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.messageTime}>
        🕒 {new Date(item.sent_at).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📨 Notifications</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#065f46" />
      ) : messages.length === 0 ? (
        <Text style={styles.noMessage}>No notifications yet.</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
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
  noMessage: {
    fontSize: 16,
    color: '#065f46',
    textAlign: 'center',
    marginTop: 40,
  },
  list: {
    paddingBottom: 20,
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#065f46',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#555',
    marginTop: 6,
  },
});

export default Notifications;
