import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

const SAMPLE = [
  { id: "1", address: "123 Main St", note: "Large sofa" },
  { id: "2", address: "45 Oak Ave", note: "Fridge" },
];

export default function BulkPickupScreen({ navigation }) {
  const [items, setItems] = useState(SAMPLE);

  return (
    <View style={styles.container}>
      <Header title="Bulk Pickup" />
      <TouchableOpacity
        style={styles.newBtn}
        onPress={() => navigation.navigate("NewPickup")}
      >
        <Text style={styles.newBtnText}>+ New Pickup</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.note}>{item.note}</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("PickupDetail", { item })}
            >
              <Text style={styles.btnText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f8",
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  address: { fontWeight: "600" },
  note: { color: "#555" },
  btn: {
    backgroundColor: "#0a84ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnText: { color: "#fff" },
  newBtn: {
    backgroundColor: "#0a84ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  newBtnText: { color: "#fff", fontWeight: "600" },
});
