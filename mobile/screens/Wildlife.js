import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

const Wildlife = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.title}>Wildlife in the Park</Text>
        <Image source={require('../images/wildlifetowatch3.jpeg')} style={styles.image} />
        <Text style={styles.description}>
        This park is a perfect place to observe wildlife in their natural habitat. 
        You can see amazing animals like hornbills, proboscis monkeys, and especially orangutans. 
        There are special areas where visitors can safely watch these animals while learning about how the park protects them.
        </Text>

        <Text style={styles.title}>Orangutan</Text>
        <Image source={require('../images/wildlifetowatch1.jpeg')} style={styles.image} />
        <Text style={styles.description}>
        The orangutan is one of the most iconic animals in Borneo. Known for its reddish-brown hair and high intelligence, 
        this great ape is mainly found in the trees of our protected forests. 
        Park guides share valuable knowledge about orangutan behavior, diet, and conservation efforts during your visit.
        </Text>

        
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});

export default Wildlife;
