// screens/CartScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import AppLayout from "../components/AppLayout";
import { useCart } from "../CartContext";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <AppLayout title="My Cart" navigation={navigation}>
      <SafeAreaView style={styles.container}>
        {cart.length === 0 ? (
          <Text style={styles.empty}>🛒 Your cart is empty</Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 120 }} // button overlap na ho
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>
                      ${item.price} × {item.qty} = ${item.price * item.qty}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Bottom Section */}
            <View style={styles.bottomBox}>
              <View style={styles.totalBox}>
                <Text style={styles.totalText}>Grand Total:</Text>
                <Text style={styles.totalPrice}>${total}</Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => navigation.navigate("Checkout", { products: cart })}
              >
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "gray" },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginHorizontal: 12,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 14, color: "gray" },
  remove: { color: "red", fontSize: 12, marginLeft: 8 },

  bottomBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  totalText: { fontSize: 16, fontWeight: "600" },
  totalPrice: { fontSize: 18, fontWeight: "700", color: "#0a84ff" },
  checkoutBtn: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
