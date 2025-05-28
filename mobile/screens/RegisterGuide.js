import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';

// Adjust baseURL to your backend server address
// For Android Emulator localhost access use 10.0.2.2
// For real device or iOS simulator replace with your machine IP like 'http://192.168.x.x:3000'
axios.defaults.baseURL = 'http://10.0.2.2:3000';

export default function RegisterGuide() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/manage-guides');
      setGuides(data);
    } catch (err) {
      console.error('Fetch failed:', err);
      Alert.alert('Error', 'Failed to fetch guides. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', email: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (guide) => {
    setEditingId(guide.guide_id);
    setForm({ name: guide.name, email: guide.email });
    setError('');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Delete this guide and their data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`/api/manage-guides/${id}`);
              setGuides(prev => prev.filter(g => g.guide_id !== id));
              Alert.alert('Deleted', 'Guide deleted successfully.');
            } catch (err) {
              console.error('Delete failed:', err);
              Alert.alert('Error', 'Delete failed. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and Email are required');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/manage-guides/${editingId}`, form);
      } else {
        await axios.post('/api/manage-guides', form);
      }
      setShowModal(false);
      fetchGuides();
    } catch (err) {
      console.error('Save failed:', err);
      setError('Save failed. Email might already be in use.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.guideRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.guideName}>{item.name}</Text>
        <Text style={styles.guideEmail}>{item.email}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#f0ad4e' }]}
          onPress={() => openEdit(item)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#d9534f' }]}
          onPress={() => handleDelete(item.guide_id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Park Guides</Text>

      <Button title="+ Add New Guide" onPress={openAdd} />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : guides.length === 0 ? (
        <Text style={styles.noGuides}>No guides available</Text>
      ) : (
        <FlatList
          data={guides}
          keyExtractor={(item) => item.guide_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editingId ? 'Edit Guide' : 'Add Guide'}</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(text) => setForm(f => ({ ...f, name: text }))}
              placeholder="Enter name"
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(text) => setForm(f => ({ ...f, email: text }))}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setShowModal(false)} />
              <Button
                title={editingId ? 'Save Changes' : 'Create Guide'}
                onPress={handleSave}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  noGuides: { marginTop: 40, textAlign: 'center', fontSize: 16, color: '#666' },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  guideName: { fontSize: 18, fontWeight: '600' },
  guideEmail: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row' },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  actionText: { color: '#fff', fontWeight: '600' },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: { color: 'red', marginBottom: 10, textAlign: 'center' },
});
