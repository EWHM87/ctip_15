import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AIBiodiversity = () => {
  const [photoUri, setPhotoUri] = useState(null);

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
      console.log("Captured image URI:", image.uri);
      // You can now send `image.uri` to your AI model if needed
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AI Biodiversity Scanner</Text>
      <Text style={styles.text}>Scan plants and animals to identify species using AI.</Text>

      <Button title="📷 Open Camera" onPress={openCamera} />

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.image} />
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
});

export default AIBiodiversity;
