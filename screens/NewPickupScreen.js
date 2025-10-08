import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import Header from "../components/Header";

export default function NewPickupScreen() {
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  function submit() {
    if (!address) {
      Alert.alert("Error", "Please enter address");
      return;
    }
    Alert.alert("Submitted", "Pickup scheduled successfully!");
  }

  return (
    <View style={styles.container}>
      <Header title="New Pickup" />
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter note (e.g., sofa)"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Submit Pickup" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
});
