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

const WriteReview = () => {
  const [formData, setFormData] = useState({
    visitorName: '',
    guideName: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    console.log(formData);
    setFormData({
      visitorName: '',
      guideName: '',
      q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
    });
  };

  const renderPicker = (question, field) => (
    <View style={styles.pickerGroup}>
      <Text style={styles.label}>{question}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => handleChange(field, value)}>
          <Picker.Item label="Select" value="" />
          {[1, 2, 3, 4, 5].map(n => (
            <Picker.Item key={n} label={n.toString()} value={n.toString()} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>📝 Semenggoh Wildlife Centre Feedback Form</Text>

        <Text style={styles.label}>Visitor Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.visitorName}
          onChangeText={(text) => handleChange('visitorName', text)}
        />

        <Text style={styles.label}>Guide Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter guide's name"
          value={formData.guideName}
          onChangeText={(text) => handleChange('guideName', text)}
        />

        <Text style={styles.subtitle}>Please rate the following (1 = Poor, 5 = Excellent):</Text>

        {renderPicker('1. How informative was the guide about orangutan behavior?', 'q1')}
        {renderPicker('2. Was the guide respectful toward the wildlife and environment?', 'q2')}
        {renderPicker('3. Did the guide communicate clearly and answer questions effectively?', 'q3')}
        {renderPicker('4. How well did the guide manage the group during the visit?', 'q4')}
        {renderPicker('5. Was the safety information provided adequate and helpful?', 'q5')}
        {renderPicker('6. How satisfied are you with the overall tour experience?', 'q6')}
        {renderPicker('7. How would you rate the cleanliness and facilities of the park?', 'q7')}

        <Text style={styles.label}>8. Any suggestions or comments?</Text>
        <TextInput
          style={[styles.input, { height: 100 }]} 
          multiline
          placeholder="Write your comments here..."
          value={formData.q8}
          onChangeText={(text) => handleChange('q8', text)}
        />

        <Button title="Submit Feedback" onPress={handleSubmit} color="#10b981" />
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
    paddingBottom: 40,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#065f46',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#065f46',
    fontWeight: '500'
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
});

export default WriteReview;