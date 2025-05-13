import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

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
          <TouchableOpacity onPress={() => setIsSidebarVisible(false)} style={styles.overlayBackground} />
        </View>
      )}

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setIsSidebarVisible(!isSidebarVisible)} style={styles.hamburgerInline}>
            <Ionicons name="menu-outline" size={30} color="#065f46" />
          </TouchableOpacity>
          <Text style={styles.title}>🌿 Sarawak Parks</Text>
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

        {/* Visitor Information Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>🌳 Visitor Information</Text>
          <View style={styles.infoGroup}>
            <Ionicons name="location-outline" size={20} color="#065f46" style={styles.infoIcon} />
            <Text style={styles.infoText}>Jalan Tapang, 93250 Kuching, Sarawak, Malaysia</Text>
          </View>
          <View style={styles.infoGroup}>
            <Ionicons name="call-outline" size={20} color="#065f46" style={styles.infoIcon} />
            <Text style={styles.infoText}>+60 82-123456</Text>
          </View>
          <View style={styles.infoGroup}>
            <Ionicons name="mail-outline" size={20} color="#065f46" style={styles.infoIcon} />
            <Text style={styles.infoText}>info@sarawakparks.com</Text>
          </View>
          <View style={styles.infoGroup}>
            <Ionicons name="time-outline" size={20} color="#065f46" style={styles.infoIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoText}>Operating Hours:</Text>
              <Text style={styles.infoSubText}>Mon–Thu: 8:00am – 5:30pm</Text>
              <Text style={styles.infoSubText}>Fri: 8:00am – 11:45am & 2:15pm – 5:00pm</Text>
              <Text style={styles.infoSubText}>Weekends & Public Holidays: Closed</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.navButton}>
          <Ionicons name="home-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Wildlife')} style={styles.navButton}>
          <Ionicons name="paw-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Wildlife</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Activities')} style={styles.navButton}>
          <Ionicons name="bicycle-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowLoginOptions(!showLoginOptions)} style={styles.navButton}>
          <Ionicons name="log-in-outline" size={26} color="#fff" />
          <Text style={styles.navLabel}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Login Options Popup */}
      {showLoginOptions && (
        <View style={styles.loginPopup}>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('VisitorLogin'); }}>
            <Text style={styles.loginText}>Visitor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('UserLogin'); }}>
            <Text style={styles.loginText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('AdminLogin'); }}>
            <Text style={styles.loginText}>Admin</Text>
          </TouchableOpacity>
        </View>
      )}
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
    top: 0, bottom: 0, left: 0, right: 0,
    flexDirection: 'row', zIndex: 5,
  },
  overlayBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
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
  loginPopup: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  loginOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loginText: {
    fontSize: 14,
    color: '#065f46',
    fontWeight: 'bold',
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#065f46',
    fontWeight: '500',
  },
  infoSubText: {
    fontSize: 13,
    color: '#065f46',
    marginLeft: 5,
    marginTop: 2,
  },
});

export default HomePage;
