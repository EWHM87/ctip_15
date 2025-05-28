import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CommonActions } from '@react-navigation/native';
import { BACKEND_URL } from '@env';

const WriteReview = ({ navigation }) => {
  const [formData, setFormData] = useState({
    visitor_id: '',
    guide_id: null,
    feedback_text: '',
    wildlife_rating: null,
    communication_rating: null,
    friendliness_rating: null,
    storytelling_rating: null,
    safety_rating: null,
    respect_rating: null,
    overall_rating: null,
  });

  const [openDropdown, setOpenDropdown] = useState('');
  const [guides, setGuides] = useState([]);
  const [guideDropdownOpen, setGuideDropdownOpen] = useState(false);

  const ratingItems = [1, 2, 3, 4, 5].map(n => ({ label: `${n}`, value: n }));

  const questions = [
    { name: 'wildlife_rating', label: '1. Knowledge of wildlife and biodiversity' },
    { name: 'communication_rating', label: '2. Communication clarity and confidence' },
    { name: 'friendliness_rating', label: '3. Friendliness and professionalism' },
    { name: 'storytelling_rating', label: '4. Engagement and storytelling skills' },
    { name: 'safety_rating', label: '5. Adherence to safety procedures' },
    { name: 'respect_rating', label: '6. Respect shown to wildlife and environment' },
    { name: 'overall_rating', label: '7. Overall visitor satisfaction' },
  ];

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/manage-guides`)
      .then(res => res.json())
      .then(data => {
        const guideOptions = data.map(g => ({ label: g.name, value: g.guide_id }));
        setGuides(guideOptions);
      })
      .catch(err => {
        console.error('❌ Could not fetch guides:', err);
        Alert.alert('Error', 'Failed to load guide list.');
      });
  }, []);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const ratings = questions.map(q => formData[q.name]);
    if (ratings.some(r => r === null) || !formData.visitor_id || !formData.guide_id) {
      Alert.alert("❗ Incomplete", "Please complete all fields.");
      return;
    }

    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    try {
      const response = await fetch(`${BACKEND_URL}/api/submit-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating: avg })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("✅ Feedback Submitted", `Average Rating: ${avg.toFixed(2)}`, [
          {
            text: "OK",
            onPress: () => navigation.dispatch(CommonActions.reset({
              index: 0,
              routes: [{ name: 'VisitorDashboard' }]
            }))
          }
        ]);
      } else {
        Alert.alert("❌ Submission Failed", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      Alert.alert("❌ Network Error", "Failed to send feedback.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.section, { zIndex: 1000 - index }]}>
      <Text style={styles.label}>{item.label}</Text>
      <DropDownPicker
        open={openDropdown === item.name}
        value={formData[item.name]}
        items={ratingItems}
        setOpen={(isOpen) => setOpenDropdown(isOpen ? item.name : '')}
        setValue={(cb) => handleChange(item.name, cb())}
        placeholder="Select a rating"
        style={styles.dropdown}
        dropDownContainerStyle={{ borderColor: '#065f46' }}
        nestedScrollEnabled={true}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.safeArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 40 }}>📝</Text>
                <Text style={styles.title}>Feedback Form</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Visitor Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.visitor_id}
                  onChangeText={(text) => handleChange('visitor_id', text)}
                  placeholder="Enter your name"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Guide Name:</Text>
                <DropDownPicker
                  open={guideDropdownOpen}
                  value={formData.guide_id}
                  items={guides}
                  setOpen={setGuideDropdownOpen}
                  setValue={(cb) => handleChange('guide_id', cb())}
                  placeholder="Select a guide"
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderColor: '#065f46' }}
                />
              </View>

              <Text style={styles.subtitle}>Rate the following:</Text>
            </View>
          }
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ListFooterComponent={
            <View style={styles.container}>
              <View style={styles.section}>
                <Text style={styles.label}>Suggestions or Comments:</Text>
                <TextInput
                  style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                  multiline
                  value={formData.feedback_text}
                  onChangeText={(text) => handleChange('feedback_text', text)}
                  placeholder="Write your comments here..."
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.submitButton}>
                <Button title="Submit Feedback" onPress={handleSubmit} color="#ffffff" />
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fdf4' },
  container: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#047857',
    marginTop: 6,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
    marginVertical: 12
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#047857',
    marginBottom: 6
  },
  input: {
    borderColor: '#047857',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  dropdown: {
    borderColor: '#047857',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 10,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#10b981',
    elevation: 2
  },
});

export default WriteReview;
