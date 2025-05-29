import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { BACKEND_URL } from '@env';

const ManageGuide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/manage-guides`);
      const data = await res.json();
      setGuides(data);
    } catch {
      Alert.alert('Error', 'Failed to load guide list.');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (guide) => {
    setEditing(guide);
    setName(guide.name);
    setEmail(guide.email);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Missing Info', 'Please fill in both name and email.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/manage-guides/${editing.guide_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setModalVisible(false);
        fetchGuides();
        Alert.alert('Updated', 'Guide information updated.');
      } else {
        const data = await res.json();
        Alert.alert('Error', data.message || 'Update failed.');
      }
    } catch {
      Alert.alert('Error', 'Unable to update at this time.');
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Delete this guide?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${BACKEND_URL}/api/manage-guides/${id}`, {
              method: 'DELETE',
            });
            if (res.ok) {
              fetchGuides();
              Alert.alert('Deleted', 'Guide removed.');
            } else {
              Alert.alert('Error', 'Deletion failed.');
            }
          } catch {
            Alert.alert('Error', 'Unable to delete at this time.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.edit]}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.delete]}
          onPress={() => handleDelete(item.guide_id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Manage Park Guides</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" />
      ) : (
        <FlatList
          data={guides}
          keyExtractor={(item) => item.guide_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Guide</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#333' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#10b981' }]}
                onPress={handleSave}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 8,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  edit: {
    backgroundColor: '#f59e0b',
  },
  delete: {
    backgroundColor: '#ef4444',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065f46',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default ManageGuide;
