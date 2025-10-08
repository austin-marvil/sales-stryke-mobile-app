// components/AddressStartScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AppLayout from "./AppLayout";

export default function AddressStartScreen({ title, navigation }) {
  const [address, setAddress] = useState("");

  return (
    <AppLayout title={title} navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>

        <TextInput
          placeholder="Enter your address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: address ? "#0a84ff" : "gray" }]}
          disabled={!address}
          onPress={() => navigation.navigate("Calendar", { address })}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  btn: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
