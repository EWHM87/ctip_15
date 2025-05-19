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
    visitorName: '',
    guideName: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://192.168.0.10:5000/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Alert.alert('✅ Feedback Submitted', 'Thank you for your feedback!');
        setFormData({
          visitorName: '',
          guideName: '',
          q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: ''
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'VisitorDashboard' }],
          })
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

  const questionList = [
    { name: 'q1', label: '1. Knowledge of wildlife and biodiversity' },
    { name: 'q2', label: '2. Communication clarity and confidence' },
    { name: 'q3', label: '3. Friendliness and professionalism' },
    { name: 'q4', label: '4. Engagement and storytelling skills' },
    { name: 'q5', label: '5. Adherence to safety procedures' },
    { name: 'q6', label: '6. Respect shown to wildlife and environment' },
    { name: 'q7', label: '7. Overall visitor satisfaction' },
  ];

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

        {questionList.map((q) => (
  <React.Fragment key={q.name}>
    {renderPicker(q.label, q.name)}
  </React.Fragment>
))}

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