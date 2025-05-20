//VisitorDashboard.js
import React, { useState, useEffect } from 'react';
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
import { BACKEND_URL, AI_URL } from '@env';

import { Alert } from 'react-native'; 

const VisitorDashboard = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  useEffect(() => {
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      redirectToLogin();
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/protected-route`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || data?.user?.role !== 'visitor') {
        console.log('❌ Not authorized or not a visitor');
        redirectToLogin();
      } else {
        console.log('✅ Visitor verified');
      }
    } catch (err) {
      console.error('❌ Verification failed', err);
      redirectToLogin();
    }
  };

  const redirectToLogin = () => {
    Alert.alert('Unauthorized', 'Please login as a visitor');
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'VisitorLogin' }] }));
  };

  verifyToken();
}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <View style={styles.sidebarOverlay}>
          <View style={styles.verticalNavbar}>
            <TouchableOpacity onPress={() => setIsSidebarVisible(false)} style={styles.verticalNavButton}>
              <Ionicons name="close-outline" size={26} color="#fff" />
              <Text style={styles.verticalLabel}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VisitorDashboard')} style={styles.verticalNavButton}>
              <Ionicons name="home-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AIBiodiversityScanner')} style={styles.verticalNavButton}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Scanner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('WriteReview')} style={styles.verticalNavButton}>
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Feedback</Text>
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
              style={styles.verticalNavButton}
            >
              <Ionicons name="log-out-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsSidebarVisible(false)} style={styles.overlayBackground} />
        </View>
      )}

      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setIsSidebarVisible(!isSidebarVisible)} style={styles.hamburgerInline}>
              <Ionicons name="menu-outline" size={30} color="#065f46" />
            </TouchableOpacity>
            <Text style={styles.title}>Visitor Dashboard</Text>
          </View>

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

          {/* Visitor Feedback */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>💬 Visitor Feedback</Text>
            <Image source={require('../images/home2.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="chatbox-ellipses" text="Write Review" onPress={() => navigation.navigate('WriteReview')} />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('VisitorDashboard')} style={styles.navButton}>
          <Ionicons name="home-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AIBiodiversityScanner')} style={styles.navButton}>
          <Ionicons name="camera-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WriteReview')} style={styles.navButton}>
          <Ionicons name="chatbox-ellipses-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Feedback</Text>
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
  safeArea: { flex: 1, backgroundColor: '#ecfdf5' },
  mainContent: { flex: 1 },
  container: { padding: 20, paddingBottom: 80 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065f46',
    textAlign: 'center',
    
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginBottom: 20,
   
  },
  hamburgerInline: {
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
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
  cardHeader: { fontSize: 20, fontWeight: '600', color: '#065f46', marginBottom: 12 },
  sectionImage: { width: '100%', height: 200, borderRadius: 8, marginTop: 8, marginBottom: 12 },
  buttonGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
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
  icon: { marginRight: 6 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
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
  navButton: { alignItems: 'center', justifyContent: 'center', padding: 8 },
  navLabel: { color: '#fff', fontSize: 9, fontWeight: 'bold', marginTop: 3 },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 5,
  },
  overlayBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  verticalNavbar: {
    width: 200,
    backgroundColor: '#065f46',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  verticalNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  verticalLabel: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default VisitorDashboard;