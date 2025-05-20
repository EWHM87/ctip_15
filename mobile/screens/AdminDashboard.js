import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { BACKEND_URL, AI_URL } from '@env';


const AdminDashboard = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return redirectToLogin();

      try {
        const res = await fetch(`${BACKEND_URL}/api/admin-only`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok || data?.message !== 'Welcome, Admin!') {
          redirectToLogin();
        }
      } catch (err) {
        console.error('Verification failed', err);
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
      {/* Sidebar */}
      {isSidebarVisible && (
        <View style={styles.sidebarOverlay}>
          <View style={styles.verticalNavbar}>
            <TouchableOpacity onPress={() => setIsSidebarVisible(false)} style={styles.verticalNavButton}>
              <Ionicons name="close-outline" size={26} color="#fff" />
              <Text style={styles.verticalLabel}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')} style={styles.verticalNavButton}>
              <Ionicons name="home-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterGuide')} style={styles.verticalNavButton}>
              <Ionicons name="person-add-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Register Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ManageGuide')} style={styles.verticalNavButton}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Manage Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GuidePerformance')} style={styles.verticalNavButton}>
              <Ionicons name="stats-chart-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Guide Performance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VisitorFeedbackReview')} style={styles.verticalNavButton}>
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Visitor Review</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('IoTMonitor')} style={styles.verticalNavButton}>
              <Ionicons name="hardware-chip-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>IoT Monitor</Text>
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
            <Text style={styles.title}>Admin Dashboard</Text>
          </View>

          {/* Content sections */}
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

          <View style={styles.card}>
            <Text style={styles.cardHeader}>📌 Essential Info</Text>
            <Image source={require('../images/home3.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="star" text="Must-see Spots" onPress={() => navigation.navigate('MustSeeSpot')} />
              <FeatureButton icon="book" text="Park History" onPress={() => navigation.navigate('ParkHistory')} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>👥 Park Guide Management</Text>
            <Image source={require('../images/home.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="person-add" text="Register Guide" onPress={() => navigation.navigate('RegisterGuide')} />
              <FeatureButton icon="settings" text="Manage Guide" onPress={() => navigation.navigate('ManageGuide')} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>📅 Training & Reminder</Text>
            <Image source={require('../images/home5.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="calendar" text="CreateTraining" onPress={() => navigation.navigate('CreateTraining')} />
              <FeatureButton icon="notifications" text="Send Reminder" onPress={() => navigation.navigate('SendReminders')} />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardHeader}>💬 Feedback</Text>
            <Image source={require('../images/feedbackphoto.jpeg')} style={styles.sectionImage} />
            <View style={styles.buttonGrid}>
              <FeatureButton icon="stats-chart" text="Guide Performance" onPress={() => navigation.navigate('GuidePerformance')} />
              <FeatureButton icon="chatbox" text="Visitor Review" onPress={() => navigation.navigate('VisitorFeedbackReview')} />
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
        <TouchableOpacity onPress={() => navigation.navigate('VisitorFeedbackReview')} style={styles.navButton}>
          <Ionicons name="chatbox-ellipses-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IoTMonitor')} style={styles.navButton}>
          <Ionicons name="hardware-chip-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>IoT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'HomePage' }] })
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
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 30, marginBottom: 20, marginTop: 20 },
  hamburgerInline: { padding: 6, backgroundColor: '#ffffff', borderRadius: 8, elevation: 4 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#065f46' },
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
    paddingTop: 40,
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

export default AdminDashboard;
