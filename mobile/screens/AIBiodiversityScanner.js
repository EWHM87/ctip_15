import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AIBiodiversity = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setPrediction(null);
      setLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      try {
        const res = await axios.post('http://172.17.9.163:8000/predict', formData, {
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setPhotoUri(null);
    setPrediction(null);
  };

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Title & Subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Biodiversity Scanner</Text>
        <Text style={styles.text}>Scan plants to identify species using AI.</Text>
      </View>

      {/* Camera Button */}
      <TouchableOpacity
        style={[styles.cameraButton, loading && { opacity: 0.6 }]}
        onPress={openCamera}
        disabled={loading}
      >
        <Text style={styles.cameraButtonText}>📷 Open Camera</Text>
      </TouchableOpacity>

      {/* Image Preview */}
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.image} />
      )}

      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#10b981" />
            <Text style={styles.loading}>🔍 Detecting...</Text>
          </View>
        )}

        {prediction && (
          <>
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>🌿 Prediction Result</Text>
              <Text style={styles.resultText}>Plant: {prediction.plant}</Text>
              <Text style={styles.resultText}>Confidence: {prediction.confidence}%</Text>
            </View>

            <TouchableOpacity style={styles.clearButton} onPress={handleReset}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: '#065f46',
  },
  cameraButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  cameraButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  feedbackSection: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  loading: {
    marginTop: 10,
    fontSize: 16,
    color: '#10b981',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 20,
    padding: 18,
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 6,
  },
  resultText: {
    fontSize: 16,
    color: '#064e3b',
  },
  clearWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  clearButton: {
  marginTop: 20,
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: '#f87171',
  alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIBiodiversity;
