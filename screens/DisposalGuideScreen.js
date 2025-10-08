import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppLayout from "../components/AppLayout";

const SECTIONS = [
  { id: "1", title: "Electronics", body: "Dispose electronics safely..." },
  { id: "2", title: "Furniture", body: "Donate or schedule bulk pickup..." },
];

export default function DisposalGuideScreen({ navigation }) {
  return (
    <AppLayout title="Disposal Guide" navigation={navigation}>
    <View style={styles.container}>
      {SECTIONS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate("GuideDetail", { item })}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  card: {
    padding: 14,
    backgroundColor: "#f7f7f8",
    marginBottom: 10,
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "600" },
});
