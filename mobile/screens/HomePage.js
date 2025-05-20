import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomePage = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const shortcuts = [
    { icon: 'navigate', label: 'Park Routes', screen: 'ParkRoutes' },
    { icon: 'paw', label: 'Wildlife', screen: 'Wildlife' },
    { icon: 'bicycle', label: 'Activities', screen: 'Activities' },
    { icon: 'home', label: 'Place', screen: 'Accommodations' },
    
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
            {[
              { label: 'Home', screen: 'HomePage', icon: 'home-outline' },
              { label: 'Visitor', screen: 'VisitorLogin', icon: 'person-outline' },
              { label: 'Park Guide', screen: 'UserLogin', icon: 'person-circle-outline' },
              { label: 'Admin', screen: 'AdminLogin', icon: 'shield-checkmark-outline' },
              { label: 'Scanner', screen: 'AIBiodiversityScanner', icon: 'camera-outline' },
            ].map((item, i) => (
              <TouchableOpacity key={i} onPress={() => navigation.navigate(item.screen)} style={styles.verticalNavButton}>
                <Ionicons name={item.icon} size={24} color="#fff" />
                <Text style={styles.verticalLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
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
        <TabButton icon="home" label="Home" onPress={() => navigation.navigate('HomePage')} />
        <TabButton icon="leaf" label="Wildlife" onPress={() => navigation.navigate('Wildlife')} />
        <TabButton icon="bicycle" label="Activities" onPress={() => navigation.navigate('Activities')} />
        <TabButton icon="log-in" label="Login" onPress={() => setShowLoginOptions(true)} />
      </View>

      {/* Login Popup */}
      {showLoginOptions && (
        <View style={styles.loginPopup}>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('VisitorLogin'); }}>
            <Text style={styles.loginText}>Visitor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('UserLogin'); }}>
            <Text style={styles.loginText}>Park Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginOption} onPress={() => { setShowLoginOptions(false); navigation.navigate('AdminLogin'); }}>
            <Text style={styles.loginText}>Admin</Text>
          </TouchableOpacity>
        </View>
      )}
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

export default HomePage;
