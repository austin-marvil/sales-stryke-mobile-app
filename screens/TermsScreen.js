// screens/TermsScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import AppLayout from "../components/AppLayout";

export default function TermsScreen({ navigation, route }) {
  const { product, date, qty } = route.params;
  const [agree, setAgree] = useState(false);

  function goNext() {
    if (!agree) {
      alert("Please accept terms and conditions");
      return;
    }
    navigation.navigate("Checkout", { product, date, qty });
  }

  return (
    <AppLayout title="Terms & Conditon" navigation={navigation}>
    <View style={styles.container}>
      <Text style={styles.body}>
        Please read and accept our terms & conditions before proceeding.
      </Text>

      {/* Custom checkbox using button */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setAgree(!agree)}
      >
        <View style={[styles.checkbox, agree && styles.checkboxChecked]} />
        <Text style={styles.label}>I accept the Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={goNext}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  body: { fontSize: 16, marginBottom: 20 },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#0a84ff",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#0a84ff",
  },
  label: { fontSize: 16 },
  btn: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
