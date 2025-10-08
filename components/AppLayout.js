// components/AppLayout.js
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./AppHeader";
import { useCart } from "../CartContext";

export default function AppLayout({ children, title, navigation }) {
  const { cart } = useCart();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" backgroundColor="#0a84ff" />
      <AppHeader
        title={title}
        cartCount={cart.length}
        onCartPress={() => navigation?.navigate("Cart")}
      />
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  body: { flex: 1 },
});
