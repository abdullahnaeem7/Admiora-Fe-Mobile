import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

export default function settings() {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [offersByEmail, setOffersByEmail] = useState(false);
  const [floatingIcon, setFloatingIcon] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button and Header */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image source={require("../../assets/images/Group 18258.png")} />
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Language Row */}
        <View style={styles.row}>
          <Text style={styles.text}>Language</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Select Language</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        {/* Switch Row: Receive Push Notifications */}
        <View style={styles.row}>
          <Text style={styles.text}>Receive push notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={(value) => setPushNotifications(value)}
          />
        </View>
        <View style={styles.separator} />

        {/* Switch Row: Receive Offers By Email */}
        <View style={styles.row}>
          <Text style={styles.text}>Receive offers by email</Text>
          <Switch
            value={offersByEmail}
            onValueChange={(value) => setOffersByEmail(value)}
          />
        </View>
        <View style={styles.separator} />

        {/* Switch Row: Show Floating Icon */}
        <View style={styles.row}>
          <Text style={styles.text}>Show floating icon</Text>
          <Switch
            value={floatingIcon}
            onValueChange={(value) => setFloatingIcon(value)}
          />
        </View>
        <View style={styles.separator} />
      </View>

      {/* Apply Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.savetext}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  linkText: {
    fontSize: 16,
    color: "#87CDF6",
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#87CDF6",
    justifyContent: "center",
    height: 57,
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
  },
  savetext: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
