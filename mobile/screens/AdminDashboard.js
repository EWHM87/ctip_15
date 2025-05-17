//AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

const AdminDashboard = ({ navigation }) => {
useEffect(() => {
const verifyToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    redirectToLogin();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/admin-only`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok || data?.message !== 'Welcome, Admin!') {
      console.log('❌ Not admin or invalid token');
      redirectToLogin();
    } else {
      console.log('✅ Admin verified');
    }
  } catch (err) {
    console.error('❌ Verification failed', err);
    redirectToLogin();
  }
};


  const redirectToLogin = () => {
    Alert.alert('Unauthorized', 'Please login as admin');
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'AdminLogin' }] }));
  };

  verifyToken();
}, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Admin Dashboard</Text>

          {/* Interactive Map Section */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>🗺️ Interactive Maps</Text>
            <Image source={require('../images/home4.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="navigate" text="Park Routes" onPress={() => navigation.navigate('ParkRoutes')} />
              <FeatureButton icon="paw" text="Wildlife" onPress={() => navigation.navigate('Wildlife')} />
              <FeatureButton icon="bicycle" text="Activities" onPress={() => navigation.navigate('Activities')} />
              <FeatureButton icon="home" text="Accommodations" onPress={() => navigation.navigate('Accommodations')} />
            </View>
          </View>

          {/* Essential Info Section */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>📌 Essential Info</Text>
            <Image source={require('../images/home3.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="star" text="Must-see Spots" onPress={() => navigation.navigate('MustSeeSpot')} />
              <FeatureButton icon="book" text="Park History" onPress={() => navigation.navigate('ParkHistory')} />
            </View>
          </View>

          {/* Park Guide Management */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>👥 Park Guide Management</Text>
            <Image source={require('../images/home.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="person-add" text="Add New Guide" onPress={() => navigation.navigate('AddGuide')} />
              <FeatureButton icon="create" text="Update Guide Info" onPress={() => navigation.navigate('UpdateGuide')} />
              <FeatureButton icon="trash" text="Delete Guide" onPress={() => navigation.navigate('DeleteGuide')} />
            </View>
          </View>

          {/* Training Section */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>📅 Training & Remimder</Text>
            <Image source={require('../images/home5.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="calendar" text="CreateTraining" onPress={() => navigation.navigate('CreateTraining')} />
              <FeatureButton icon="notifications" text="Send Reminder" onPress={() => navigation.navigate('SendReminders')} />
            </View>
          </View>

          {/* Visitor Feedback */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>💬Feedback</Text>
            <Image source={require('../images/feedbackphoto.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="stats-chart" text="Guide Performance" onPress={() => navigation.navigate('GuidePerformance')} />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')} style={styles.navButton}>
          <Ionicons name="home-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GuidePerformance')} style={styles.navButton}>
          <Ionicons name="people-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTraining')} style={styles.navButton}>
          <Ionicons name="calendar-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Training</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminProfile')} style={styles.navButton}>
          <Ionicons name="person-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
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
          style={styles.navButton}
        >
          <Ionicons name="log-out-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const FeatureButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.featureButton} onPress={onPress}>
    <Ionicons name={`${icon}-outline`} size={20} color="#fff" style={styles.icon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  mainContent: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 80,
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
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  featureButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#065f46',
    paddingVertical: 6,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 6,
    elevation: 4,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navLabel: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 3,
  },
});

export default AdminDashboard;
