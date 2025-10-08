// screens/ProductGridScreen.js
import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import AppLayout from "../components/AppLayout";

const PRODUCTS = [
  {
    id: "1",
    name: "Sofa",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 500,
    image: "https://interwood.pk/cdn/shop/files/Camden.jpg?v=1757596289",
  },
  {
    id: "2",
    name: "Table",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 350,
    image: "https://habitt.com/cdn/shop/files/11_1e8d94db-c72f-4876-a48c-4ecb19261dfe_1.jpg?v=1753439200",
  },
  {
    id: "3",
    name: "Chair",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 400,
    image: "https://interwood.pk/cdn/shop/files/Coco_Dining_Chair.jpg?v=1757596277",
  },
];

export default function ProductGridScreen({ navigation }) {
  return (
    <AppLayout title="Products" navigation={navigation}>
      <FlatList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductQuantity", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: "600", fontSize: 16 },
  price: { fontSize: 14, fontWeight: "700", color: "#0a84ff", marginBottom: 4 },
  desc: { fontSize: 12, color: "gray", textAlign: "center" },
});
