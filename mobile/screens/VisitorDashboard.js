//VisitorDashboard.js
import React from 'react';
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

const VisitorDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Visitor Dashboard</Text>

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

export default VisitorDashboard;