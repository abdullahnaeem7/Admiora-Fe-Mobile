import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImage}
            source={require("../../assets/images/Ellipse 16.png")}
          />
          <Image
            style={styles.overlayImage}
            source={require("../../assets/images/Group 58.png")}
          />
        </View>
        <Text style={styles.successText}>Success !</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Your payment was successful, A receipt for this purchase has been
            sent to your email
          </Text>
        </View>
        <TouchableOpacity
          style={styles.successButton}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mainImage: {
    width: 90,
    height: 90,
  },
  overlayImage: {
    width: 36,
    height: 26,
    position: "absolute",
  },
  successText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#87CDF6",
    textAlign: "center",
  },
  descriptionContainer: {
    marginTop: 20,
    width: "60%",
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#808080",
  },
  successButton: {
    marginTop: 30,
    backgroundColor: "#87CDF6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default SuccessScreen;
