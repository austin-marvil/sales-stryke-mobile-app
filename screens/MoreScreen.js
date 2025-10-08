import React, { useState } from "react";
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
import AppLayout from "../components/AppLayout";

export default function MoreScreen({ navigation }) {
  const [lang, setLang] = useState(false);
  const [notify, setNotify] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [problemText, setProblemText] = useState("");

  function sendProblem() {
    Alert.alert("Sent", "Your problem has been reported.");
    setModalVisible(false);
    setProblemText("");
  }

  return (
    <AppLayout title="More" navigation={navigation}>
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
              style={styles.textArea}
            />
            <View style={styles.actions}>
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
    </AppLayout>
  );
}

const styles = StyleSheet.create({
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
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
