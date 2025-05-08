import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.contentContainer}>
        
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.title}>Welcome to the Park!</Text>

        {/* Interactive Map Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>🗺️ Interactive Map</Text>
          <Image
            source={require('../images/home.jpeg')}
            style={styles.mapImage}
            resizeMode="contain"
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ParkRoutes')}
            >
              <Ionicons name="navigate-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Park Routes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="star-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Must-see Spots</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Park History Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>📖 Park History</Text>
          <Image
            source={require('../images/parkhistory.jpeg')}
            style={styles.historyImage}
            resizeMode="contain"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ParkHistory')}
            >
              <Ionicons name="book-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Park History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="leaf-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Conservation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Visitor Feedback Section */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>💬 Visitor Feedback</Text>
          <Image
            source={require('../images/feedbackphoto.jpeg')}
            style={styles.feedbackImage}
            resizeMode="contain"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="star-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Rate Guides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('WriteReview')}
            >
              <Ionicons name="chatbox-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Write Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Navbar */}
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
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 70,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 80,
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
