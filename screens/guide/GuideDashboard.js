import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export default function GuideDashboard({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Guide Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>👤 Profile</Text>
        <Text>Manage your profile and view your details</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>📚 Training & Learning</Text>
        <Text>Enroll in training programs and track your progress</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🎓 Certifications</Text>
        <Text>View and manage your certifications</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🗺️ Interactive Park Maps</Text>
        <Text>Access park maps and explore various areas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌱 AI Biodiversity Scanner</Text>
        <Text>Scan and identify species with the AI tool</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🔔 Notifications</Text>
        <Text>View your upcoming training sessions and alerts</Text>
      </View>

      <Button title="Logout" onPress={() => navigation.replace("Visitor")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
