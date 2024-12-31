import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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

const chat = () => {
  const [condition, setCondition] = useState("Unread");

  const unread = [
    {
      id: "1",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "7:20 pm",
      image: require("../../assets/images/Ellipse 174.png"),
    },
    {
      id: "2",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "7:20 pm",
      image: require("../../assets/images/Ellipse 174 (1).png"),
    },
    {
      id: "3",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "7:20 pm",
      image: require("../../assets/images/Ellipse 174 (2).png"),
    },
    {
      id: "4",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "7:20 pm",
      image: require("../../assets/images/Ellipse 174 (3).png"),
    },
    {
      id: "5",
      title: "Jeo Marthin",
      time: "5:08 pm",
      description: "You're welcome",
      image: require("../../assets/images/Ellipse 174 (4).png"),
    },
    {
      id: "6",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "yesterday",
      image: require("../../assets/images/Ellipse 174 (5).png"),
    },
    {
      id: "7",
      title: "Jeo Marthin",
      description: "You're welcome",
      time: "yesterday",
      image: require("../../assets/images/Ellipse 174 (7).png"),
    },
  ];

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginBottom: 10,
              }}
            >
              Chats
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("../../assets/images/3597089 1.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("../../assets/images/7693332 1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.searchContainer}>
              <AntDesign
                name="search1"
                size={24}
                color="black"
                style={styles.icon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <FlatList
            data={unread}
            keyExtractor={(item) => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.replace("/chat/chatperson")}
              >
                <View style={styles.specialitemslist}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={item.image}
                        style={styles.specialitemsimage}
                      />
                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 20,
                          width: "55%",
                          height: "50%",
                        }}
                      >
                        <Text style={styles.categoryTextspecial}>
                          {item.title}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ marginTop: 10, marginRight: 4 }}>
                            <FontAwesome6
                              name="check-double"
                              size={13}
                              color="#87CDF6"
                            />
                          </View>
                          <Text style={styles.categoryTextspeciall}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{}}>
                      <Text style={styles.Tidnumber}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
  categoryTextspecial: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "left",
  },

  categoryTextspeciall: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "left",
    color: "#979797",
  },
  specialitemsimage: {
    width: 62,
    height: 65,
    borderRadius: 10,
    marginBottom: 5,
  },
  specialitemslist: {
    marginRight: 15,
    width: "100%",
    marginBottom: 20,
  },

  Tidnumber: {
    fontSize: 14,
    marginTop: 20,
    color: "#979797",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 10, // Add some spacing between the icon and the text input
  },
});

export default chat;
