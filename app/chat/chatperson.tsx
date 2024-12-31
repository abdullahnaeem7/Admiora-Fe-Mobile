import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { router } from "expo-router";

const chatperson = () => {
  const [inputHeight, setInputHeight] = useState(40);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginRight: 20, marginTop: 10 }}
                onPress={() => router.back()}
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
              <Image
                style={{ width: 42, height: 45 }}
                source={require("../../assets/images/Ellipse 174.png")}
              />
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Jeo Martin</Text>
                <Text style={{ color: "#979797" }}>online</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Feather name="phone" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Feather
                  style={{ marginLeft: 10 }}
                  name="video"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottombar}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginRight: 20, marginTop: 10 }}
                onPress={() => router.back()}
              >
                <Entypo name="attachment" size={22} color="black" />
              </TouchableOpacity>
            </View>
            <View style={[styles.textInputContainer, { height: inputHeight }]}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                multiline={true}
                onContentSizeChange={(e) => {
                  setInputHeight(
                    Math.min(100, e.nativeEvent.contentSize.height)
                  );
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Ionicons name="mic-outline" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../../assets/images/Group 33440.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    position: "relative",
    height: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  navbar: {
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  bottombar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    boxShadow: "0 0px 20px rgba(0, 0, 0, 0.1)",
  },
  textInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    flex: 1,
  },
});

export default chatperson;
