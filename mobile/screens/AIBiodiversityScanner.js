import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AIBiodiversity = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      const image = result.assets[0];
      setPhotoUri(image.uri);
      setPrediction(null); // reset previous prediction

      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      try {
        const res = await axios.post('http://192.168.0.10:8000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { plant, confidence } = res.data;
        setPrediction({
          plant,
          confidence: (confidence * 100).toFixed(2),
        });
      } catch (error) {
        console.error('❌ Prediction failed:', error.message);
        setPrediction({
          plant: 'Prediction failed',
          confidence: '0',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Biodiversity Scanner</Text>
      <Text style={styles.text}>Scan plants to identify species using AI.</Text>

      <Button title="📷 Open Camera" onPress={openCamera} />

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.image} />
      )}

      {prediction && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>🌿 Prediction Result</Text>
          <Text style={styles.resultText}>Plant: {prediction.plant}</Text>
          <Text style={styles.resultText}>Confidence: {prediction.confidence}%</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d1fae5',
    borderRadius: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#064e3b',
  },
});

export default AIBiodiversity;
