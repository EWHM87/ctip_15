import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageGuide = () => {
  const [guides, setGuides] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);

  const handleEdit = (guide) => {
    Alert.alert('Edit Guide', `You tapped to edit ${guide.name}`);
  };

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this guide?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          setGuides(prev => prev.filter(g => g.id !== id));
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Guides</Text>
      {guides.map((guide) => (
        <View key={guide.id} style={styles.card}>
          <View style={styles.infoSection}>
            <Text style={styles.name}>{guide.name}</Text>
            <Text style={styles.email}>{guide.email}</Text>
          </View>
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => handleEdit(guide)}>
              <Ionicons name="create-outline" size={20} color="#065f46" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(guide.id)}>
              <Ionicons name="trash-outline" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#ecfdf5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#065f46', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoSection: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#065f46' },
  email: { fontSize: 14, color: '#4b5563' },
  actionSection: { flexDirection: 'row', gap: 10 },
  actionBtn: { marginLeft: 10 },
});

export default ManageGuide;