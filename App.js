import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

// Screens
import CalendarScreen from "./screens/CalendarScreen";
import ProductGridScreen from "./screens/ProductGridScreen";
import ProductQuantityScreen from "./screens/ProductQuantityScreen";
import TermsScreen from "./screens/TermsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import PaymentScreen from "./screens/PaymentScreen";
import DisposalGuideScreen from "./screens/DisposalGuideScreen";
import GuideDetailScreen from "./screens/GuideDetailScreen";
import MoreScreen from "./screens/MoreScreen";
import SplashScreen from "./screens/SplashScreen";
import AuthScreen from "./screens/AuthScreen";
import ServiceCalendarScreen from "./screens/ServiceCalendarScreen";
import BulkPickupCalendarScreen from "./screens/BulkPickupCalendarScreen";
import DisposalGuideCalendarScreen from "./screens/DisposalGuideCalendarScreen";

import { CartProvider } from "./CartContext";
import { getSalesStrykeClient } from "./src/salesStrykeClient"; // 🔹 add this import

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Calendar Flow
function CalendarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarMain" component={CalendarScreen} />
      <Stack.Screen name="ProductGrid" component={ProductGridScreen} />
      <Stack.Screen name="ProductQuantity" component={ProductQuantityScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

// Disposal Flow
function DisposalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DisposalList" component={DisposalGuideScreen} />
      <Stack.Screen name="GuideDetail" component={GuideDetailScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let name;
          if (route.name === "Service Calendar") name = "calendar";
          else if (route.name === "Bulk Pickup") name = "cube";
          else if (route.name === "Disposal Guide") name = "trash";
          else name = "ellipsis-horizontal";
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0a84ff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Service Calendar" component={ServiceCalendarScreen} />
      <Tab.Screen name="Bulk Pickup" component={BulkPickupCalendarScreen} />
      <Tab.Screen name="Disposal Guide" component={DisposalGuideCalendarScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

// Root Stack
function RootStack({ initialRoute }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Cart" component={require("./screens/CartScreen").default} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Calendar" component={CalendarStack} />
    </Stack.Navigator>
  );
}

// App Entry
export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const saved = await AsyncStorage.getItem("salesstryke_identity");
        if (saved) {
          const data = JSON.parse(saved);
          console.log("✅ Found saved login:", data);
          const client = getSalesStrykeClient();
          if (data.jwtToken) client.jwtToken = data.jwtToken;
          setInitialRoute("MainTabs");
        } else {
          setInitialRoute("Auth");
        }
      } catch (err) {
        console.error("Error checking login:", err);
        setInitialRoute("Auth");
      }
    };
    checkLogin();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0a84ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <RootStack initialRoute={initialRoute} />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
