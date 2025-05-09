import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const MustSeeSpotScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌟 Must-See Spots</Text>

      <Image
        source={require('../images/home1.jpg')} // Replace with your image
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🦧 Orangutan Feeding Area</Text>
        <Text style={styles.description}>
          Watch semi-wild orangutans during scheduled feeding times at Platform A or B. A rare and exciting experience!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌿 Native Plant Garden</Text>
        <Text style={styles.description}>
          A peaceful area filled with native Sarawakian flora. Learn about local herbs and their traditional uses.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌺 Arboretum Trail</Text>
        <Text style={styles.description}>
          A relaxing trail showcasing a variety of tree species with educational signboards and resting huts.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏞️ Viewing Platform</Text>
        <Text style={styles.description}>
          Climb up for a panoramic view of the park, perfect for nature photos and quiet reflection.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E4A62',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C5A75',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default MustSeeSpotScreen;
