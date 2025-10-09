import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ServiceCalendarScreen({ navigation }) {
  const [address, setAddress] = useState("");

  const handleGetStarted = () => {
    if (!address.trim()) return;
    // ✅ Pass address to CalendarMain
    navigation.navigate("CalendarMain", { address });
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
        disabled={!address}
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
