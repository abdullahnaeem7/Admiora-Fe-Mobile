import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

export default function notifications() {
  const [condition, setCondition] = useState("Unread");
  const [unread, setUnread] = useState([
    {
      id: "1",
      title: "SALE IS LIVE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      image: require("../../assets/images/notification.png"),
    },
    {
      id: "2",
      title: "SALE IS LIVE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      image: require("../../assets/images/notification.png"),
    },
    {
      id: "3",
      title: "SALE IS LIVE",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "1m ago",
      image: require("../../assets/images/notification.png"),
    },
  ]);

  const [read, setRead] = useState<any[]>([]);

  // Mark a notification as read
  const markAsRead = (notification: any) => {
    setUnread((prev) => prev.filter((item) => item.id !== notification.id));
    setRead((prev) => [notification, ...prev]);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        {/* Toggle Switch */}
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "Unread" && styles.activeButton,
            ]}
            onPress={() => setCondition("Unread")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "Unread" && styles.activeText,
              ]}
            >
              Unrerad
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "read" && styles.activeButton,
            ]}
            onPress={() => setCondition("read")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "read" && styles.activeText,
              ]}
            >
              Read
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {condition === "Unread" ? (
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginBottom: 10,
                    textDecorationLine: "underline",
                  }}
                >
                  Unread
                </Text>
              </View>
              <FlatList
                style={{ marginBottom: 150 }}
                data={unread}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.specialitemslist}
                    onPress={() => markAsRead(item)}
                  >
                    <View style={styles.notificationRow}>
                      <Image
                        source={item.image}
                        style={styles.specialitemsimage}
                      />
                      <View style={styles.notificationDetails}>
                        <Text style={styles.categoryTextspecial}>
                          {item.title}
                        </Text>
                        <Text style={styles.categoryTextspeciall}>
                          {item.description}
                        </Text>
                      </View>
                      <Text style={styles.Tidnumber}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginBottom: 10,
                    textDecorationLine: "underline",
                  }}
                >
                  Read
                </Text>
              </View>
              <FlatList
                style={{ marginBottom: 150 }}
                data={read}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.specialitemslist}>
                    <View style={styles.notificationRow}>
                      <Image
                        source={item.image}
                        style={styles.specialitemsimage}
                      />
                      <View style={styles.notificationDetails}>
                        <Text style={styles.readtitle}>{item.title}</Text>
                        <Text style={styles.descriptionread}>
                          {item.description}
                        </Text>
                      </View>
                      <Text style={styles.Timeread}>{item.time}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    height: 55,
    width: "100%",
    borderColor: "#87CDF6",
    borderWidth: 1,
    borderRadius: 25,
    padding: 2,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#87CDF6",
  },
  switchText: {
    fontSize: 16,
    color: "#87CDF6",
  },
  activeText: {
    color: "black",
  },
  contentContainer: {
    marginTop: 20,
  },

  categoryTextspecial: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  readtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#A1A1A1",
    textAlign: "left",
  },
  categoryTextspeciall: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "left",
  },
  descriptionread: {
    fontSize: 9,
    color: "#A1A1A1",
    fontWeight: "bold",
    textAlign: "left",
  },
  specialitemsimage: {
    width: 65,
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
    fontWeight: "bold",
  },

  Timeread: {
    fontSize: 14,
    color: "#A1A1A1",
    fontWeight: "bold",
  },

  notificationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  notificationDetails: {
    flexDirection: "column",
    marginLeft: 20,
    width: "55%",
  },
});
