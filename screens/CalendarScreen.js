// screens/CalendarScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { getSalesStrykeClient } from "../src/salesStrykeClient";

export default function CalendarScreen({ route, navigation }) {
  const { address } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy available dates (could be fetched via API later)
  const dates = [
    "Oct 10, 2025",
    "Oct 11, 2025",
    "Oct 12, 2025",
    "Oct 13, 2025",
    "Oct 14, 2025",
  ];

  async function handleProceed() {
    if (!selectedDate) {
      Alert.alert("Select a date first");
      return;
    }

    try {
      setLoading(true);
      const client = getSalesStrykeClient();
      const res = await client.product.getAllDetail();
      console.log("✅ Products API Response:", res);
      navigation.navigate("ProductGrid", {
        products: res.data || [],
        address,
        selectedDate,
      });
    } catch (err) {
      console.error("❌ Product fetch error:", err);
      Alert.alert("Error", "Unable to load products from server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout title="Select Service Date" navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.heading}>Select a Date for Pickup</Text>

        <FlatList
          data={dates}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateBtn,
                selectedDate === item && styles.dateBtnActive,
              ]}
              onPress={() => setSelectedDate(item)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item && { color: "#fff" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={[
            styles.nextBtn,
            { backgroundColor: selectedDate ? "#0a84ff" : "gray" },
          ]}
          disabled={!selectedDate || loading}
          onPress={handleProceed}
        >
          <Text style={styles.nextText}>
            {loading ? "Loading..." : "Proceed to Products"}
          </Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  dateBtn: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  dateBtnActive: {
    backgroundColor: "#0a84ff",
    borderColor: "#0a84ff",
  },
  dateText: { textAlign: "center", fontSize: 16 },
  nextBtn: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
