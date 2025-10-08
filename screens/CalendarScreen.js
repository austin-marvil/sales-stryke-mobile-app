import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Header from "../components/Header";
import { TouchableOpacity, Text } from "react-native";
import AppLayout from "../components/AppLayout";

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);

  function onDayPress(day) {
    setSelectedDate(day.dateString);
  }

  function goNext() {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date first");
      return;
    }
    navigation.navigate("ProductGrid", { date: selectedDate });
  }

  return (
    <AppLayout title="Select Date" navigation={navigation}>
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={
          selectedDate ? { [selectedDate]: { selected: true, selectedColor: "#0a84ff" } } : {}
        }
      />
      <TouchableOpacity style={styles.btn} onPress={goNext}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  btn: {
    backgroundColor: "#0a84ff",
    padding: 14,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
