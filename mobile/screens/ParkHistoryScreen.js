import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ParkHistoryScreen = () => {
  const handleLearnMore = () => {
    // Replace with a real URL or internal navigation
    Linking.openURL('https://sarawakforestry.com/semenggoh-nature-reserve/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History of Semenggoh Nature Reserve</Text>

      <Image
        source={require('../images/parkhistory.jpeg')} // Replace with your actual image file
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.heading}>🔹 1975 - Foundation as a Rehabilitation Centre</Text>
        <Text style={styles.description}>
          Semenggoh Nature Reserve was established in 1975 by the Sarawak Forest Department to provide a safe refuge for orangutans rescued from captivity or illegal pet trade. It focused on rehabilitating these orangutans and gradually reintroducing them into a protected forest environment.
        </Text>

        <Text style={styles.heading}>🔹 1980s-1990s - Expansion into a Wildlife Sanctuary</Text>
        <Text style={styles.description}>
          Over time, Semenggoh evolved into a broader sanctuary supporting other native species and a more natural, semi-wild habitat for orangutans. Researchers and rangers closely monitored the animals, helping shape global orangutan conservation strategies.
        </Text>

        <Text style={styles.heading}>🔹 2000s - Education, Research, and Conservation Hub</Text>
        <Text style={styles.description}>
          The park became a vibrant center for environmental education and research. Schools, universities, and tourists visited to learn about rainforest biodiversity and wildlife protection, while scientists used it as a base for field research.
        </Text>

        <Text style={styles.heading}>🔹 Present Day - A Living Success Story</Text>
        <Text style={styles.description}>
          Today, Semenggoh is one of Malaysia's most successful orangutan conservation projects. Many orangutans have adapted to living independently in the wild. Visitors now come to observe these magnificent creatures in their natural environment, especially during the morning and afternoon feeding sessions.
        </Text>

        <Text style={styles.quickFactsTitle}>📍 Quick Facts</Text>
        <Text style={styles.description}>
          • Location: 24 km from Kuching, Sarawak{'\n'}
          • Size: Approximately 740 hectares{'\n'}
          • Orangutans Rehabilitated: Over 30 individuals{'\n'}
          • Functions: Wildlife rehabilitation, biodiversity research, eco-education, and tourism
        </Text>

        <TouchableOpacity onPress={handleLearnMore} style={styles.learnMoreButton}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
        
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
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3D59',
    marginTop: 10,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 10,
  },
  quickFactsTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2B6E4F',
    marginTop: 16,
    marginBottom: 6,
  },
  learnMoreButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#2B6E4F',
    borderRadius: 8,
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkHistoryScreen;
