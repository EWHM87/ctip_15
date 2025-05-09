import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GuidePerformance = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Guide Performance</Text>

        <View style={styles.card}>
          <Image source={require('../images/feedbackphoto.jpeg')} style={styles.image} />
          <Text style={styles.description}>
            This section presents feedback collected from visitors to help track and evaluate the performance of park guides. AI-powered insights provide personalized training suggestions based on this feedback.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>💬 Visitor Feedback</Text>
          <Text style={styles.text}>"John was extremely knowledgeable and helpful during the hike!"</Text>
          <Text style={styles.text}>"The guide could provide more detailed info about local wildlife."</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>🤖 AI Suggestions</Text>
          <Text style={styles.text}>Recommended: Advanced Wildlife Training Module for Guide Anna</Text>
          <Text style={styles.text}>Recommended: Customer Interaction Workshop for Guide Ben</Text>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ecfdf5',
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
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 8,
    color: '#444',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});

export default GuidePerformance;
