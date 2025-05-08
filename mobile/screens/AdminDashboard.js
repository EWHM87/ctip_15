import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Welcome, Admin!</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageUsers')}>
              <Ionicons name="people-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewFeedback')}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>View Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('HomePage')} 
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#065f46',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  logoutButton: {
    backgroundColor: '#e63946',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default AdminDashboard;
