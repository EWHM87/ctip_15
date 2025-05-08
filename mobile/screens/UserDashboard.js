import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to User Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.message}>What would you like to do today?</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WriteReview')}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Write a Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewReviews')}>
            <Ionicons name="document-text-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>View My Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button outside of the card */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('HomePage')} // 👈 Navigate to Visitor Page
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065f46',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default UserDashboard;
