// screens/PaymentScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
import AppLayout from "../components/AppLayout";
import { useCart } from "../CartContext";

export default function PaymentScreen({ route, navigation }) {
  const { products, name, phone, address, email } = route.params || {};
  const { clearCart } = useCart();
  const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  // Simulate Stripe Payment
  function handleStripe() {
    Alert.alert("Stripe Sandbox", "✅ Payment successful via Stripe Test");
    clearCart();
    navigation.navigate("Calendar");
  }

  // Simulate PayPal Payment
  function handlePaypal() {
    Alert.alert("PayPal Sandbox", "✅ Payment successful via PayPal Test");
    clearCart();
    navigation.navigate("Calendar");
  }

  return (
    <AppLayout title="Payment" navigation={navigation}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
          {/* Payment Summary */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>💳 Payment Summary</Text>
            {products.map((p) => (
              <View key={p.id} style={styles.row}>
                <Text style={styles.item}>{p.name} × {p.qty}</Text>
                <Text style={styles.price}>${p.price * p.qty}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Payment:</Text>
              <Text style={styles.totalPrice}>${total}</Text>
            </View>
          </View>

          {/* Customer Details */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>👤 Customer Details</Text>
            <Text style={styles.detail}>Name: {name}</Text>
            <Text style={styles.detail}>Phone: {phone}</Text>
            <Text style={styles.detail}>Address: {address}</Text>
            <Text style={styles.detail}>Email: {email}</Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View style={styles.bottomBox}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: "#0a84ff" }]} onPress={handleStripe}>
            <Text style={styles.btnText}>Pay with Stripe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, { backgroundColor: "#003087" }]} onPress={handlePaypal}>
            <Text style={styles.btnText}>Pay with PayPal</Text>
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
  item: { fontSize: 14, color: "#333" },
  price: { fontSize: 14, fontWeight: "600", color: "#0a84ff" },

  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, borderTopWidth: 1, borderColor: "#eee", paddingTop: 10 },
  totalText: { fontSize: 16, fontWeight: "600" },
  totalPrice: { fontSize: 18, fontWeight: "700", color: "#0a84ff" },

  detail: { fontSize: 14, marginBottom: 6 },

  bottomBox: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  btn: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
