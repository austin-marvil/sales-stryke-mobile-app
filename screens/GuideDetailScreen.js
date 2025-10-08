// screens/GuideDetailScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AppLayout from "../components/AppLayout";

export default function GuideDetailScreen({ route, navigation }) {
  // safe access — route or params might be undefined
  const item = route?.params?.item ?? route?.params?.data ?? null;

  // Fallback title when no item passed
  const title = item?.title ?? "Disposal Guide";

  return (
    <AppLayout title={title} navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        {item ? (
          <>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body ?? "No detailed description available."}</Text>
          </>
        ) : (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No guide selected. Please go back and choose a guide.</Text>
          </View>
        )}
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  body: { fontSize: 16, lineHeight: 22, color: "#333" },
  emptyWrap: { flex: 1, minHeight: 200, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: 16, color: "gray", textAlign: "center" },
});
