import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ParkRouteScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Semenggoh Park Route</Text>

      <Image
        source={require('../images/parkroutesmap.jpeg')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.description}>
          🌿 Explore a scenic loop trail through Semenggoh Nature Reserve.
        </Text>

        <Text style={styles.description}>
        🏞️ Start near Feeding Platform A to catch a glimpse of orangutans during feeding time.
        </Text>

        <Text style={styles.description}>
          🌳 Walk past rainforest trees, the Kubahia Centre, and open lawns.
        </Text>

        <Text style={styles.description}>
          🌺 Discover side trails to the herb garden, arboretum, and native plant zones.
        </Text>

        <Text style={styles.description}>
          🏞️ End the loop at the Wildlife Centre with more viewing spots and info areas.
        </Text>

        <Text style={styles.description}>
          🚻 Rest stops, toilets, and signs make your visit easy and relaxing.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.description}>
          🚶‍♂️ <Text style={{ fontWeight: 'bold' }}>Recommended Route:</Text>
        </Text>
        <Text style={styles.description}>
          ✅ Start at the Ticket Counter and proceed to the Guard Post.
        </Text>
        <Text style={styles.description}>
        📸 Visit Feeding Platform A for early orangutan sightings.
        </Text>
        <Text style={styles.description}>
          🌿 Continue through zones 4 to 8 — enjoy rainforest trees, native plants, and gardens.
        </Text>
        <Text style={styles.description}>
          📸 Take side trails to the Herb Garden and Arboretum for more sights and photos.
        </Text>
        <Text style={styles.description}>
          🏁 Finish the trail at Feeding Platform B and explore the Semenggoh Wildlife Centre.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E4A62',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 12,
  },
});

export default ParkRouteScreen;
