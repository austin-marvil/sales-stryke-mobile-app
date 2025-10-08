// screens/ProductQuantityScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useCart } from "../CartContext";

export default function ProductQuantityScreen({ route, navigation }) {
  const { product } = route.params;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  function increase() {
    setQty((q) => q + 1);
  }

  function decrease() {
    if (qty > 1) setQty((q) => q - 1);
  }

  function handleAddToCart() {
    addToCart({ ...product, qty });
    navigation.navigate("Cart");
  }

  return (
    <AppLayout title="Product Detail" navigation={navigation}>
      <View style={styles.container}>
        {/* Top Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Product Info */}
        <ScrollView style={styles.detailContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </ScrollView>

        {/* Bottom Row: Qty + Add to Cart */}
        <View style={styles.bottomRow}>
          <View style={styles.qtyRow}>
            <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
            <Text style={styles.cartBtnText}>
              Add to Cart (${product.price * qty})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 280, resizeMode: "cover" },
  detailContainer: { flex: 1, padding: 16 },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  price: { fontSize: 18, fontWeight: "700", color: "#0a84ff", marginBottom: 10 },
  desc: { fontSize: 14, color: "gray", marginBottom: 20 },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  qtyRow: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#eee",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 20, fontWeight: "bold" },
  qtyValue: { marginHorizontal: 12, fontSize: 18, fontWeight: "600" },
  cartBtn: {
    backgroundColor: "#0a84ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cartBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
