import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockFeedback = [
  {
    visitorName: 'Alice Tan',
    guideName: 'John Lee',
    comment: 'The guide was very knowledgeable and friendly. Great experience!',
  },
  {
    visitorName: 'Samuel Ng',
    guideName: 'Lisa Wong',
    comment: 'Loved learning about the orangutans. Excellent communication!',
  },
  {
    visitorName: 'Chong Wei',
    guideName: 'Aminah Yusuf',
    comment: 'Helpful explanations and good crowd management.',
  },
];

const VisitorFeedbackReview = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>💬 Visitor Feedback</Text>
        {mockFeedback.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="person-circle-outline" size={20} color="#065f46" />
              <Text style={styles.label}>{item.visitorName}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="ribbon-outline" size={20} color="#10b981" />
              <Text style={styles.label}>Guide: {item.guideName}</Text>
            </View>
            <View style={styles.commentBox}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#065f46" />
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ecfdf5' },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46',
  },
  commentBox: {
    flexDirection: 'row',
    marginTop: 8,
  },
  comment: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});

export default VisitorFeedbackReview;
