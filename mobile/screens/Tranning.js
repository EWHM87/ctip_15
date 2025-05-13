import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TrainingSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert('✅ Thank you!', 'Your self-assessment has been submitted.');
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.thankYou}>✅ Thank you for submitting your self-assessment!</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🧭 Park Guide Eligibility Self-Assessment</Text>
        <Text style={styles.subtitle}>Please answer honestly to assess your eligibility to become a Park Guide at Semenggoh Wildlife Centre.</Text>

        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text style={styles.label}>Email Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />

        {renderQuestion('1. Do you have basic knowledge of Borneo\'s flora and fauna?', 'q1')}
        {renderQuestion('2. Are you comfortable guiding groups of people through jungle trails?', 'q2')}
        {renderQuestion('3. Are you fluent in either Bahasa Malaysia or English?', 'q3')}
        {renderQuestion('4. Are you able to commit to the full training program duration?', 'q4')}
        {renderQuestion('5. Do you have any prior experience in tourism or guiding?', 'q5')}
        {renderQuestion('6. Are you physically fit and capable of outdoor activities?', 'q6')}

        <Text style={styles.label}>7. Why do you want to become a park guide at Semenggoh?</Text>
        <TextInput
          style={[styles.input, { height: 100 }]} multiline
          placeholder="Explain your motivation here..."
          value={formData.q7}
          onChangeText={(text) => handleChange('q7', text)}
        />

        <Text style={styles.label}>8. Do you have any concerns or needs we should be aware of?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]} multiline
          placeholder="(Optional)"
          value={formData.q8}
          onChangeText={(text) => handleChange('q8', text)}
        />

        <Button title="Submit Assessment" onPress={handleSubmit} color="#10b981" />
      </ScrollView>
    </KeyboardAvoidingView>
  );

  function renderQuestion(label, field) {
    return (
      <View style={styles.pickerGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData[field]}
            onValueChange={(value) => handleChange(field, value)}>
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Yes" value="yes" />
            <Picker.Item label="No" value="no" />
          </Picker>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#065f46',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#065f46',
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  pickerGroup: {
    marginBottom: 16,
  },
  pickerWrapper: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  thankYou: {
    fontSize: 18,
    color: '#065f46',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default TrainingSignup;