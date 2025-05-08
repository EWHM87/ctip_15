import React, { useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const images = [
  require('../images/Accommodation1.jpg'),
  require('../images/Accommodation2.jpg'),
  require('../images/Accommodation3.jpg'),
  require('../images/Accommodation4.jpg'),
];

const Accommodations = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openMaps = () => {
    const address = 'Jalan Sungai Tapang, Kota Sentosa, L8-5-08 Liberty Grove Kuching, Kuching City Center, Kuching, Malaysia, 93250';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Accommodations</Text>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
            <Ionicons name="chevron-back" size={32} color="#065f46" />
          </TouchableOpacity>

          <Image source={images[currentImage]} style={styles.image} />

          <TouchableOpacity onPress={handleNext} style={styles.arrow}>
            <Ionicons name="chevron-forward" size={32} color="#065f46" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={openMaps}>
          <Text style={styles.link}>
            📍 Jalan Sungai Tapang, L8-5-08 Liberty Grove, Kota Sentosa, Kuching, Malaysia 93250
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Enjoy a relaxing stay at Staycation Homestay, rated 3 out of 5 stars. Conveniently located at Liberty Grove near Kuching Airport, this homestay provides free parking and easy access to local attractions and restaurants in Kuching City Center.
        </Text>

        

        <Text style={styles.description}>
          Don’t forget to visit the nearby Semenggoh Nature Reserve before ending your trip!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  arrow: {
    padding: 8,
  },
  image: {
    width: 320,
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 14,
    lineHeight: 22,
  },
  link: {
    fontSize: 16,
    color: '#065f46',
    textDecorationLine: 'underline',
    marginBottom: 14,
  },
});

export default Accommodations;
