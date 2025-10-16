// screens/ServiceCalendarScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { getSalesStrykeClient } from "../src/salesStrykeClient";

export default function ServiceCalendarScreen({ navigation }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    if (!address.trim()) return;
    setLoading(true);

    try {
      const client = getSalesStrykeClient();
      const results = await client.importData.searchAddress(address);

      if (results && results.length > 0) {
        console.log("Address found:", results[0]);
        navigation.navigate("CalendarMain", { address, region: results[0] });
      } else {
        Alert.alert("No Services Found", "No available services found for this address.");
      }
    } catch (err) {
      console.error("Address search error:", err);
      Alert.alert("Error", err.message || "Failed to fetch service availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Calendar</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity
        style={[styles.button, !address && { backgroundColor: "#ccc" }]}
        onPress={handleGetStarted}
        disabled={!address || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get Started</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0a84ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
