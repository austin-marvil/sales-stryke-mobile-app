import React, { useEffect } from "react";
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

export default function ProductGridScreen({ route, navigation }) {
  const { products = [], address, selectedDate } = route.params || {};

  useEffect(() => {
    console.log("✅ Loaded Products:", products.length);
  }, [products]);

  // 💲 Extract product price safely
  const getProductPrice = (product) => {
    try {
      const pricing =
        Array.isArray(product.productPricings) &&
        product.productPricings.length > 0
          ? product.productPricings[0]
          : null;
      if (!pricing || !pricing.unitPrice) return "N/A";
      return `$${parseFloat(pricing.unitPrice).toFixed(2)}`;
    } catch (e) {
      console.warn("⚠️ Price error", e);
      return "N/A";
    }
  };

  // 🖼 Extract product image safely
  const getProductImage = (product) => {
    try {
      const image =
        Array.isArray(product.productImages) &&
        product.productImages.length > 0
          ? product.productImages[0]
          : null;
      if (!image || !image.imagePath)
        return "https://via.placeholder.com/200x200.png?text=No+Image";
      return image.imagePath.startsWith("http")
        ? image.imagePath
        : `https://your-server-url.com/${image.imagePath}`; // 🔧 replace with actual image base URL if needed
    } catch (e) {
      console.warn("⚠️ Image error", e);
      return "https://via.placeholder.com/200x200.png?text=No+Image";
    }
  };

  const renderItem = ({ item }) => {
    const name = item.name || item.label || "Unnamed Product";
    const description =
      item.description || item.uiDescription || "No description available.";
    const price = getProductPrice(item);
    const imageUri = getProductImage(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("ProductQuantity", {
            product: item,
            address,
            selectedDate,
          })
        }
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppLayout title="Select Product" navigation={navigation}>
      {products.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0a84ff" />
          <Text style={{ marginTop: 10 }}>Loading Products...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
  image: { width: 120, height: 120, borderRadius: 10, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  desc: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0a84ff",
    marginTop: 4,
  },
});
