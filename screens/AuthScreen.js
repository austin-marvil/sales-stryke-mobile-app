import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSalesStrykeClient } from "../src/salesStrykeClient";
import { com } from "@salesstryke/mobile-api";

export default function AuthScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Auto-login check
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const saved = await AsyncStorage.getItem("salesstryke_identity");
        if (saved) {
          console.log("🔁 Auto-login with saved identity");
          navigation.replace("MainTabs");
        }
      } catch (err) {
        console.error("Error reading saved login:", err);
      }
    };
    checkLogin();
  }, []);

  // 🔹 Handle login
  async function handleLogin() {
    try {
      setLoading(true);
      const client = getSalesStrykeClient();
      const secureIdentity = new com.salesstryke.entity.classes.persistable.SecureIdentity()
        .setLogin(login)
        .setPassword(password);

      const res = await client.secureIdentity.login(secureIdentity);
      console.log("✅ Login Response:", res);

      if (res?.identity) {
        // ✅ Extract only safe fields (avoid circular refs)
        const identity = res.identity;
        const simpleIdentity = {
          id: identity.id,
          jwtToken: identity.jwtToken,
          userEmail: identity.user?.email || "",
          organizationName: identity.organization?.name || "",
          login,
        };

        // ✅ Save minimal version to AsyncStorage
        await AsyncStorage.setItem("salesstryke_identity", JSON.stringify(simpleIdentity));

        Alert.alert("Success", "Login successful!");
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      Alert.alert("Error", err.message || "Something went wrong during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SalesStryke Login</Text>
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.btn, loading && { opacity: 0.5 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16 },
  btn: { backgroundColor: "#0a84ff", padding: 14, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
});