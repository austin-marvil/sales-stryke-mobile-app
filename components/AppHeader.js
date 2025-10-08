// components/AppHeader.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AppHeader({ title, cartCount, onCartPress }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Back Button */}
      {navigation.canGoBack() ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftBtn} /> // Empty placeholder to align logo center
      )}

      {/* Center Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Cart Icon */}
      <TouchableOpacity onPress={onCartPress} style={styles.cartWrap}>
        <Ionicons name="cart" size={24} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: "#0a84ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  leftBtn: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 40,
  },
  cartWrap: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
