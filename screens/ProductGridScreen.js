import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { getSalesStrykeClient } from "../src/salesStrykeClient";

export default function ProductGridScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const client = getSalesStrykeClient();
      const response = await client.product.getAllDetail();
      console.log("✅ Products API Response:", response);
      setProducts(response || []);
    } catch (err) {
      console.error("❌ Product Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ProductQuantity", { product: item })}
      >
        <Image source={{ uri: item.image || "https://via.placeholder.com/100" }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        {item.price && <Text style={styles.price}>${item.price}</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <AppLayout title="Select Product" navigation={navigation}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0a84ff" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 10 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  price: { fontSize: 14, color: "#0a84ff", marginTop: 4 },
});
