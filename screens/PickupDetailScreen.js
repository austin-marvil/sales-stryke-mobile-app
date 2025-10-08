import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function PickupDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Pickup Details" />
      <Text style={styles.text}>Address: {item.address}</Text>
      <Text style={styles.text}>Note: {item.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  text: { fontSize: 16, marginBottom: 10 },
});
