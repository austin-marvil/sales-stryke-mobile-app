import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSalesStrykeClient } from "./salesStrykeClient";

// Initialize client with stored JWT
export async function initSalesStrykeAuth() {
  try {
    const saved = await AsyncStorage.getItem("salesstryke_identity");
    if (saved) {
      const parsed = JSON.parse(saved);
      const client = getSalesStrykeClient();
      // 🔹 Store token inside client globally (if API supports custom header injection)
      if (parsed.jwtToken) {
        client.jwtToken = parsed.jwtToken; // optional, depending on SDK internals
        console.log("✅ JWT token restored:", parsed.jwtToken.slice(0, 20) + "...");
      }
      return client;
    }
  } catch (err) {
    console.error("Auth initialization error:", err);
  }
  return null;
}
