import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';

const WriteReview = ({ navigation }) => {
  const [formData, setFormData] = useState({
    visitor_id: '',
    guide_id: '',
    feedback_text: '',
    wildlife_rating: '',
    communication_rating: '',
    friendliness_rating: '',
    storytelling_rating: '',
    safety_rating: '',
    respect_rating: '',
    overall_rating: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const ratings = [
      formData.wildlife_rating,
      formData.communication_rating,
      formData.friendliness_rating,
      formData.storytelling_rating,
      formData.safety_rating,
      formData.respect_rating,
      formData.overall_rating
    ].map(Number);

    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    const payload = {
      ...formData,
      rating: avg.toFixed(2)
    };

    try {
      const res = await fetch("http://192.168.0.10:5000/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Alert.alert('✅ Feedback Submitted', 'Thank you for your feedback!');
        setFormData({
          visitor_id: '',
          guide_id: '',
          feedback_text: '',
          wildlife_rating: '',
          communication_rating: '',
          friendliness_rating: '',
          storytelling_rating: '',
          safety_rating: '',
          respect_rating: '',
          overall_rating: ''
        });
        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: 'VisitorDashboard' }] })
        );
      } else {
        const data = await res.json();
        Alert.alert("❌ Submission Failed", data.message || "Error occurred.");
      }
    } catch (error) {
      Alert.alert("❌ Network Error", error.message);
    }
  };

  const renderPicker = (question, field) => (
    <View style={styles.section} key={field}>
      <Text style={styles.label}>{question}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => handleChange(field, value)}
          dropdownIconColor="#065f46"
          mode="dropdown">
          <Picker.Item label="Select" value="" />
          {[1, 2, 3, 4, 5].map(n => (
            <Picker.Item key={n} label={n.toString()} value={n.toString()} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const questions = [
    { name: 'wildlife_rating', label: '1. Knowledge of wildlife and biodiversity' },
    { name: 'communication_rating', label: '2. Communication clarity and confidence' },
    { name: 'friendliness_rating', label: '3. Friendliness and professionalism' },
    { name: 'storytelling_rating', label: '4. Engagement and storytelling skills' },
    { name: 'safety_rating', label: '5. Adherence to safety procedures' },
    { name: 'respect_rating', label: '6. Respect shown to wildlife and environment' },
    { name: 'overall_rating', label: '7. Overall visitor satisfaction' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>📝 Semenggoh Wildlife Centre Feedback Form</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Visitor Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            value={formData.visitor_id}
            onChangeText={(text) => handleChange('visitor_id', text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Guide Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter guide's name"
            placeholderTextColor="#888"
            value={formData.guide_id}
            onChangeText={(text) => handleChange('guide_id', text)}
          />
        </View>

        <Text style={styles.subtitle}>Please rate the following (1 = Poor, 5 = Excellent):</Text>

        {questions.map((q) => renderPicker(q.label, q.name))}

        <View style={styles.section}>
          <Text style={styles.label}>8. Any suggestions or comments?</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            multiline
            placeholder="Write your comments here..."
            placeholderTextColor="#888"
            value={formData.feedback_text}
            onChangeText={(text) => handleChange('feedback_text', text)}
          />
        </View>

        <View style={styles.submitButton}>
          <Button title="Submit Feedback" onPress={handleSubmit} color="#10b981" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ecfdf5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    marginBottom: 16,
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
  },
  pickerWrapper: {
    borderColor: '#065f46',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default WriteReview;
