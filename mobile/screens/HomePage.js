import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Sidebar Overlay (from left) */}
      {isSidebarVisible && (
        <View style={styles.sidebarOverlay}>
          <View style={styles.verticalNavbar}>
            <TouchableOpacity onPress={() => setIsSidebarVisible(false)} style={styles.verticalNavButton}>
              <Ionicons name="close-outline" size={26} color="#fff" />
              <Text style={styles.verticalLabel}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.verticalNavButton}>
              <Ionicons name="home-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('VisitorLogin')} style={styles.verticalNavButton}>
              <Ionicons name="person-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Visitor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserLogin')} style={styles.verticalNavButton}>
              <Ionicons name="person-circle-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={styles.verticalNavButton}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
              <Text style={styles.verticalLabel}>Admin</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setIsSidebarVisible(false)}
            style={styles.overlayBackground}
          />
        </View>
      )}

      {/* Main Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => setIsSidebarVisible(!isSidebarVisible)}
            style={styles.hamburgerInline}
          >
            <Ionicons name="menu-outline" size={30} color="#065f46" />
          </TouchableOpacity>
          <Text style={styles.title}>Welcome to the App!</Text>
        </View>

        {/* Interactive Map */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>🗺️ Interactive Map</Text>
          <Image source={require('../images/home.jpeg')} style={styles.mapImage} resizeMode="contain" />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ParkRoutes')}>
              <Ionicons name="navigate-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Park Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MustSeeSpot')}>
              <Ionicons name="star-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Must-see Spots</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Park History */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>📖 Park History</Text>
          <Image source={require('../images/parkhistory.jpeg')} style={styles.historyImage} resizeMode="contain" />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ParkHistory')}>
              <Ionicons name="book-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Park History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="leaf-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Conservation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback
        <View style={styles.card}>
          <Text style={styles.cardHeader}>💬 Visitor Feedback</Text>
          <Image source={require('../images/feedbackphoto.jpeg')} style={styles.feedbackImage} resizeMode="contain" />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="star-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Rate Guides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WriteReview')}>
              <Ionicons name="chatbox-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Write Review</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.navButton}>
          <Ionicons name="home-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VisitorLogin')} style={styles.navButton}>
          <Ionicons name="person-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Visitor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserLogin')} style={styles.navButton}>
          <Ionicons name="person-circle-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={styles.navButton}>
          <Ionicons name="shield-checkmark-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecfdf5' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    marginTop: 20,
  },
  hamburgerInline: {
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', // Sidebar on the left
    zIndex: 5,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  verticalNavbar: {
    width: 200,
    backgroundColor: '#065f46',
    paddingTop: 60,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 70,
  },
  title: {
    marginLeft: 13,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#065f46',
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
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  historyImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  feedbackImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
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

export default HomePage;
