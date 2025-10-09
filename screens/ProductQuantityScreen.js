import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useCart } from "../CartContext";

export default function ProductQuantityScreen({ route, navigation }) {
  const { product, address, selectedDate } = route.params || {};
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <AppLayout title="Product" navigation={navigation}>
        <View style={styles.center}>
          <Text>No product data found.</Text>
        </View>
      </AppLayout>
    );
  }

  // 💲 Extract product price
  const getProductPrice = () => {
    try {
      const pricing =
        Array.isArray(product.productPricings) &&
        product.productPricings.length > 0
          ? product.productPricings[0]
          : null;
      return pricing?.unitPrice ? parseFloat(pricing.unitPrice) : 0;
    } catch {
      return 0;
    }
  };

  // 🖼 Extract product image
  const getProductImage = () => {
    try {
      const image =
        Array.isArray(product.productImages) &&
        product.productImages.length > 0
          ? product.productImages[0]
          : null;
      if (!image || !image.imagePath)
        return "https://via.placeholder.com/300x300.png?text=No+Image";
      return image.imagePath.startsWith("http")
        ? image.imagePath
        : `https://your-server-url.com/${image.imagePath}`; // update base URL if needed
    } catch {
      return "https://via.placeholder.com/300x300.png?text=No+Image";
    }
  };

  const price = getProductPrice();
  const total = price * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity,
      image: getProductImage(),
      description: product.description,
      address,
      selectedDate,
    });

    Alert.alert("✅ Added to Cart", `${product.name} has been added.`, [
      {
        text: "Proceed to Terms",
        onPress: () => navigation.navigate("Terms", { product, address, selectedDate }),
      },
      { text: "Stay Here" },
    ]);
  };

  return (
    <AppLayout title="Select Quantity" navigation={navigation}>
      <View style={styles.container}>
        <Image source={{ uri: getProductImage() }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.desc}>
          {product.description || "No description available."}
        </Text>

        <Text style={styles.price}>${price.toFixed(2)}</Text>

        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart & Continue</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 20, alignItems: "center" },
  image: {
    width: 220,
    height: 220,
    borderRadius: 12,
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  price: { fontSize: 18, color: "#0a84ff", fontWeight: "bold" },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { fontSize: 20, fontWeight: "bold" },
  qtyValue: { marginHorizontal: 15, fontSize: 18, fontWeight: "600" },
  total: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: "#0a84ff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
