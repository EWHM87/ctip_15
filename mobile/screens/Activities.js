import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';

const Activities = () => {
  const handleLearnMore = () => {
    Linking.openURL('https://sarawakforestry.com/semenggoh-nature-reserve/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Things to Do at Semenggoh Wildlife Centre</Text>

        <Image source={require('../images/wildlifetowatch1.jpeg')} style={styles.image} />
        <Text style={styles.description}>
          🦧 Watch orangutans in their natural habitat! Visitors can witness these majestic creatures during feeding times in the forest reserve.
        </Text>

        <Image source={require('../images/activities1.jpeg')} style={styles.image} />
        <Text style={styles.description}>
          🏛️ Visit the small gallery museum to learn about the history, conservation efforts, and species living in the park. A great place to gain insights into Borneo's biodiversity.
        </Text>

        <Image source={require('../images/home2.jpeg')} style={styles.image} />
        <Text style={styles.description}>
          🛍️ Shop for souvenirs at the visitor shop! Choose from local handicrafts, wildlife-themed gifts, and eco-friendly items to remember your trip.
        </Text>

        <Image source={require('../images/home3.jpeg')} style={styles.image} />
        <Text style={styles.description}>
          🌿 Enjoy peaceful nature walks through the lush greenery. The walking trails offer scenic views, fresh air, and a chance to connect with nature.
        </Text>

        {/* Learn More Button */}
        <TouchableOpacity style={styles.button} onPress={handleLearnMore}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#065f46',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Activities;
