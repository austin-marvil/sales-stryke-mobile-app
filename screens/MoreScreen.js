// screens/MoreScreen.js
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { getSalesStrykeClient } from "../src/salesStrykeClient"; // <-- make sure this path is correct

export default function MoreScreen({ navigation }) {
  const [lang, setLang] = useState(false);
  const [notify, setNotify] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [problemText, setProblemText] = useState("");

  async function handleLogout() {
    try {
      const client = getSalesStrykeClient();

      console.log("SecureIdentity Methods:", Object.keys(client.secureIdentity));

      // The correct method from your API
      if (client.secureIdentity.delete) {
        await client.secureIdentity.delete();
      } else {
        Alert.alert("Logout Unsupported", "No logout function found in API.");
        return;
      }

      Alert.alert("Logout Successful", "You have been logged out.");
      await AsyncStorage.removeItem("salesstryke_identity");
      navigation.replace("Auth");
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Logout failed, please try again.");
    }
  }


  function sendProblem() {
    Alert.alert("Sent", "Your problem has been reported.");
    setModalVisible(false);
    setProblemText("");
  }

  return (
    <View style={styles.container}>
      <Header title="More" />

      <View style={styles.row}>
        <Text>Language</Text>
        <Switch value={lang} onValueChange={setLang} />
      </View>

      <View style={styles.row}>
        <Text>Notifications</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <TouchableOpacity
        style={styles.reportBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "#fff" }}>Report A Problem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Logout</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={{ fontWeight: "600", marginBottom: 8 }}>
              Report a Problem
            </Text>
            <TextInput
              placeholder="Describe the issue..."
              multiline
              value={problemText}
              onChangeText={setProblemText}
              style={{
                height: 120,
                borderWidth: 1,
                borderColor: "#ddd",
                padding: 8,
                borderRadius: 6,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={sendProblem}>
                <Text style={{ color: "#0a84ff" }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  reportBtn: {
    margin: 16,
    backgroundColor: "#0a84ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutBtn: {
    marginHorizontal: 16,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
});
