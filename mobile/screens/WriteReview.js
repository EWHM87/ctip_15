// screens/WriteReview.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const WriteReview = () => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    Alert.alert('Review submitted:', review);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write Your Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your review here..."
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
      />
      <Button title="Submit Review" onPress={handleSubmit} color="#10b981" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecfdf5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 16,
  },
  input: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default WriteReview;
