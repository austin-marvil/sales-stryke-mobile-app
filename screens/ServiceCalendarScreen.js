// screens/ServiceCalendarScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AppLayout from "../components/AppLayout";

export default function ServiceCalendarScreen({ navigation }) {
  const [address, setAddress] = useState("");

  const handleGetStarted = () => {
    if (!address.trim()) {
      Alert.alert("Error", "Please enter your address");
      return;
    }

    // ✅ Navigate to CalendarScreen with address param
    navigation.navigate("Calendar", { address });
  };

  return (
    <AppLayout title="Service Calendar" navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.heading}>Enter Your Service Address</Text>
        <TextInput
          placeholder="Type your address..."
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: address ? "#0a84ff" : "gray" }]}
          disabled={!address}
          onPress={handleGetStarted}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  btn: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
