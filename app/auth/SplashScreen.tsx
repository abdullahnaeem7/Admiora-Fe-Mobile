import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/splsh.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CDF6",
  },
  image: {
    width: 293,
    height: 188,
    resizeMode: "contain", // Ensures the image scales correctly while maintaining its aspect ratio
  },
});
