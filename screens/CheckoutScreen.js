// screens/CheckoutScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from "react-native";
import AppLayout from "../components/AppLayout";

export default function CheckoutScreen({ route, navigation }) {
  const { products } = route.params || [];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  function proceedToPayment() {
    if (!name || !phone || !address || !email) {
      Alert.alert("Missing Info", "Please fill all details before proceeding.");
      return;
    }

    navigation.navigate("Payment", {
      products,
      name,
      phone,
      address,
      email,
    });
  }

  return (
    <AppLayout title="Checkout" navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          {/* Order Summary */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🛍 Order Summary</Text>
            {products.map((p) => (
              <View key={p.id} style={styles.row}>
                <Text>{p.name} × {p.qty}</Text>
                <Text>${p.price * p.qty}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${total}</Text>
            </View>
          </View>

          {/* Customer Info */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>👤 Customer Info</Text>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomBox}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={proceedToPayment}>
            <Text style={styles.checkoutText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, borderTopWidth: 1, borderColor: "#eee", paddingTop: 10 },
  totalText: { fontSize: 16, fontWeight: "600" },
  totalPrice: { fontSize: 18, fontWeight: "700", color: "#0a84ff" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  checkoutBtn: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
