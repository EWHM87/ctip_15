// SendReminders.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, FlatList, ActivityIndicator
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SendReminders = () => {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState('all');
  const [reminderMessage, setReminderMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchToken = async () => await AsyncStorage.getItem('token');

  useEffect(() => {
    const loadData = async () => {
      const token = await fetchToken();
      try {
        const guideRes = await fetch(`${BACKEND_URL}/api/guides`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const guideData = await guideRes.json();
        setGuides([{ label: 'All Guides', value: 'all' }, ...guideData.map(g => ({
          label: g.username, value: g.id.toString()
        }))]);
      } catch (err) {
        console.error(err);
      }

      try {
        const msgRes = await fetch(`${BACKEND_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const msgData = await msgRes.json();
        setSentMessages(Array.isArray(msgData) ? msgData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSend = async () => {
    if (!reminderMessage.trim()) {
      Alert.alert('Please enter a message.');
      return;
    }

    const token = await fetchToken();
    try {
      const res = await fetch(`${BACKEND_URL}/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient: selectedGuide,
          content: reminderMessage.trim(),
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        Alert.alert('Send failed', body.message || 'Error sending reminder.');
        return;
      }

      const guideLabel = guides.find(g => g.value === selectedGuide)?.label;
      setSentMessages(prev => [
        {
          id: body.firstId,
          guide_name: guideLabel,
          content: reminderMessage.trim(),
          sent_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      Alert.alert('✅ Reminder sent');
      setReminderMessage('');
    } catch (err) {
      console.error(err);
      Alert.alert('Send failed');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageTo}>To: {item.guide_name}</Text>
      <Text>{item.content}</Text>
      <Text style={styles.messageTime}>
        {new Date(item.sent_at).toLocaleString()}
      </Text>
    </View>
  );

  const headerForm = () => (
    <View>
      <Text style={styles.title}>🔔 Send Reminder</Text>
      <DropDownPicker
        open={dropdownOpen}
        value={selectedGuide}
        items={guides}
        setOpen={setDropdownOpen}
        setValue={setSelectedGuide}
        setItems={setGuides}
        style={styles.dropdown}
        containerStyle={{ marginBottom: 15 }}
        placeholder="Select Guide"
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

      <Text style={styles.sentTitle}>🗂️ Sent Notifications</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ActivityIndicator size="large" color="#065f46" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={sentMessages}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={headerForm}
          contentContainerStyle={styles.container}
        />
      )}
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdown: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  sentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 10,
  },
  messageItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  messageTo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
  },
});

export default SendReminders;
