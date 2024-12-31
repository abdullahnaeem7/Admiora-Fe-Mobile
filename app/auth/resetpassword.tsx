import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { router } from "expo-router";

export default function Resetpassword() {
  const [password, setPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View
          style={{
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.replace("/auth/login")}
            style={{ flex: 1 }}
          >
            <Image source={require("../../assets/images/Group 18258.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.topCircles}>
          <View style={styles.circle1}></View>
          <View style={styles.circle3}></View>
          <View style={styles.circle2}></View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.heading}>Please enter your email address to</Text>
          <Text style={styles.heading1}>request a password reset</Text>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="prelookstudio@gmail.com"
            placeholderTextColor="#111719"
            onChangeText={(number) => setPassword(number)}
            value={password}
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            placeholderTextColor="#111719"
            onChangeText={(number) => setNewPassword(number)}
            value={NewPassword}
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>SEND NEW PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topCircles: {
    position: "absolute",
    width: "100%",
    height: height * 0.25,
  },
  circle1: {
    position: "absolute",
    top: -30,
    left: -40,
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#87CDF6",
    borderRadius: 100,
  },
  circle2: {
    position: "absolute",
    top: -100,
    right: -110,
    width: width * 0.45,
    height: width * 0.45,
    backgroundColor: "#87CDF6",
    borderRadius: 100,
  },
  circle3: {
    position: "absolute",
    top: -90,
    right: width * 0.6,
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#E8F5FD",
    borderRadius: 100,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  heading: {
    fontSize: width * 0.04,
    color: "grey",
  },
  heading1: {
    fontSize: width * 0.04,
    color: "grey",
    marginBottom: height * 0.03,
  },
  input: {
    width: "100%",
    height: height * 0.07,
    borderWidth: 1,
    borderColor: "#CDE2F1",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
  },
  loginButton: {
    width: "80%",
    height: height * 0.07,
    backgroundColor: "#87CDF6",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: height * 0.03,
  },
  loginText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000000",
  },
});
