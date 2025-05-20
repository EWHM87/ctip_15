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
  ImageBackground,
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

  const shortcuts = [
      { icon: 'navigate', label: 'Park Routes', screen: 'ParkRoutes' },
      { icon: 'paw', label: 'Wildlife', screen: 'Wildlife' },
      { icon: 'bicycle', label: 'Activities', screen: 'Activities' },
      { icon: 'home', label: 'Accommodations', screen: 'Accommodations' },
      { icon: 'camera', label: 'Scanner', screen: 'AIBiodiversityScanner' },
    ];
  
    const mustSeeRecommendations = [
      {
        title: 'Must-see Spots',
        subtitle: 'Don’t miss these attractions!',
        image: require('../images/home.jpeg'),
        screen: 'MustSeeSpot',
      },
      {
        title: 'Park History',
        subtitle: 'Discover our rainforest legacy',
        image: require('../images/home4.jpeg'),
        screen: 'ParkHistory',
      },
    ];
  
    const activityRecommendations = [
      {
        title: 'Wildlife',
        subtitle: 'Explore species around you',
        image: require('../images/wildlifetowatch1.jpeg'),
        screen: 'Wildlife',
      },
      {
        title: 'Activities',
        subtitle: 'Hiking, trekking & more',
        image: require('../images/home3.jpeg'),
        screen: 'Activities',
      },
    ];
  
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
        {/* Header with Image */}
        
  
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Shortcut Icons */}
          <ImageBackground
    source={require('../images/orangutan_hero.jpg')}
    style={styles.headerBackground}
    imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
  >
    <View style={styles.headerOverlayCenter}>
      <TouchableOpacity
        onPress={() => setIsSidebarVisible(true)}
        style={styles.centerMenuButton}
      >
        <Ionicons name="menu-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitleCenter}>Sarawak Parks</Text>
    </View>
  </ImageBackground>
  
  
          <View style={styles.fixedShortcutRow}>
            {shortcuts.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.shortcutButton}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name={`${item.icon}-outline`} size={22} color="#10b981" />
                </View>
                <Text style={styles.shortcutLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
            

            
          {/* Must-see */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Must-see</Text>
          </View>
          <View style={styles.cardGrid}>
            {mustSeeRecommendations.map((item, index) => (
              <TouchableOpacity key={index} style={styles.cardBox} onPress={() => navigation.navigate(item.screen)}>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* Explore More */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore More</Text>
          </View>
          <View style={styles.cardGrid}>
            {activityRecommendations.map((item, index) => (
              <TouchableOpacity key={index} style={styles.cardBox} onPress={() => navigation.navigate(item.screen)}>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
            
         {/* AI & Feedback Section as Card */}
<View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
  <View style={{
    backgroundColor: '#e6f9f3', // Light green background
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  }}>
    <Text style={{ fontSize: 18, fontWeight: '700', color: '#065f46', marginBottom: 10 }}>
      Digital Services
    </Text>
    <Text style={{ fontSize: 14, color: '#065f46', textAlign: 'center', marginBottom: 20, lineHeight: 20 }}>
      📷 Use our AI Scanner to identify species during your visit, or submit feedback to help us improve your experience.
    </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AIBiodiversityScanner')}
        style={{
          backgroundColor: '#10b981',
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 10,
          
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>AI Scanner</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('WriteReview')}
        style={{
          backgroundColor: '#10b981',
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Feedback</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>


          {/* Footer */}
          <View style={styles.footerInfo}>
            <Text style={styles.footerTitle}>Visitor Information</Text>
            <Text style={styles.footerText}>📍 Jalan Tapang, 93250 Kuching, Sarawak</Text>
            <Text style={styles.footerText}>📞 +60 82-123456</Text>
            <Text style={styles.footerText}>📧 info@sarawakparks.com</Text>
            <Text style={styles.footerText}>🕒 Mon–Thu: 8am–5:30pm</Text>
            <Text style={styles.footerText}>🕒 Fri: 8am–11:45am, 2:15pm–5pm</Text>
            <Text style={styles.footerText}>🛑 Weekends & PH: Closed</Text>
          </View>
        </ScrollView>
  
        {/* Bottom Tab Bar */}
        <View style={styles.tabBar}>
        <TabButton icon="home" label="Home" onPress={() => navigation.navigate('VisitorDashboard')} />
        <TabButton icon="camera" label="Scanner" onPress={() => navigation.navigate('AIBiodiversityScanner')} />
        <TabButton icon="chatbox-ellipses" label="Feedback" onPress={() => navigation.navigate('WriteReview')} />
        <TabButton icon="log-out" label="Logout" onPress={() => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'HomePage' }] }))} />
      </View>
  
        
      </SafeAreaView>
    );
  };
  
  const TabButton = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Ionicons name={`${icon}-outline`} size={22} color="#10b981" />
      <Text style={styles.tabLabel}>{label}</Text>
    </TouchableOpacity>
  );
  
  const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    headerBackground: {
      height: 220,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'flex-start',
    },
    headerTitle: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
  
    fixedShortcutRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingVertical: 20,
      backgroundColor: '#fff',
    },
    shortcutButton: { alignItems: 'center', width: 70, marginBottom: 12 },
    iconCircle: {
      backgroundColor: '#e6f9f3',
      padding: 12,
      borderRadius: 40,
      marginBottom: 6,
    },
    shortcutLabel: {
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'center',
      color: '#111',
    },
  
    sectionHeader: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 6,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#111827',
    },
    cardGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 10,
      gap: 10,
    },
    cardBox: {
      backgroundColor: '#f9fafb',
      width: '48%',
      borderRadius: 12,
      padding: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 2,
    },
    cardImage: {
      width: '100%',
      height: 100,
      borderRadius: 10,
      marginBottom: 6,
    },
    cardTitle: {
      fontWeight: '600',
      fontSize: 14,
      color: '#111',
    },
    cardSubtitle: {
      fontSize: 12,
      color: '#666',
    },
  
    footerInfo: {
      backgroundColor: '#f9fafb',
      padding: 20,
      marginTop: 10,
      borderTopWidth: 1,
      borderColor: '#eee',
    },
    footerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#065f46',
      marginBottom: 10,
    },
    footerText: {
      fontSize: 13,
      color: '#333',
      marginBottom: 5,
    },
  
    tabBar: {
      position: 'absolute',
      bottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderTopColor: '#eee',
      borderTopWidth: 1,
      width: '100%',
    },
    tabButton: { alignItems: 'center' },
    tabLabel: {
      fontSize: 10,
      marginTop: 2,
      color: '#10b981',
      fontWeight: 'bold',
    },
  
    sidebarOverlay: {
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      flexDirection: 'row',
      zIndex: 5,
    },
    verticalNavbar: {
      width: 220,
      backgroundColor: '#065f46',
      paddingTop: 50,
      paddingHorizontal: 16,
    },
    verticalNavButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomColor: '#1f9e78',
      borderBottomWidth: 0.5,
    },
    verticalLabel: {
      color: '#fff',
      fontSize: 14,
      marginLeft: 10,
    },
    overlayBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
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
    headerBackground: {
    height: 240,
    overflow: 'hidden',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  
  headerOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  
  centerMenuButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 10,
  },
  
  headerTitleCenter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default VisitorDashboard;