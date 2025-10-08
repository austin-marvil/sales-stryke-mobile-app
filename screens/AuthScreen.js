// screens/AuthScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { salesStrykeClientApiInstance } from "@salesstryke/mobile-api/src/com/salesstryke/client";
import { SecureIdentity } from "@salesstryke/mobile-api/src/com/salesstryke/entity/classes/persistable";

export default function AuthScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!login || !password) {
      Alert.alert("Error", "Please enter both login and password");
      return;
    }

    setLoading(true);
    try {
      // Create SecureIdentity and attempt login
      const secureIdentity = new SecureIdentity()
        .setLogin(login)
        .setPassword(password);

      const response = await salesStrykeClientApiInstance.secureIdentity.login(secureIdentity);

      console.log("Login Response:", response);

      if (response?.identity) {
        Alert.alert("Success", "Login successful!");
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", "Invalid credentials or missing response.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
