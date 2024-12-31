import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { router } from "expo-router";
import appContext from "@/context/appContext";
import { uploadFile } from "@/services/upload";
export default function Profile() {
  const { user } = useContext(appContext);
  const [userName, setuserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber || "");

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={require("../../assets/images/Group.png")}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 140,
            }}
          >
            <View>
              <Image
                style={styles.profileImage}
                source={
                  user?.image
                    ? { uri: user.image }
                    : require("../../assets/images/images.jpg")
                }
              />
              <View style={{ position: "absolute", left: 40, top: 55 }}>
                <Image
                  style={styles.profileImageedit}
                  source={require("../../assets/images/Group 18153.png")}
                />
              </View>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.userName}</Text>
              <TouchableOpacity
                onPress={() => router.replace("../userprofile/editprofile")}
              >
                <Text style={styles.editProfile}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Full name</Text>
            <TextInput
              readOnly
              style={styles.input}
              placeholder="Eljad Eendaz"
              placeholderTextColor="black"
              onChangeText={(text) => setuserName(text)}
              value={userName}
            />
            <Text style={styles.heading}>E-mail</Text>
            <TextInput
              readOnly
              style={styles.input}
              placeholder="preelookstudios@gmail.com"
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Text style={styles.heading}>Phone Number</Text>
            <TextInput
              readOnly
              style={styles.input}
              placeholder="+1 (783) 0986 8786"
              placeholderTextColor="black"
              onChangeText={(text) => setphoneNumber(text)}
              value={phoneNumber}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: 285,
  },
  profile: {
    borderRadius: 50,
    backgroundColor: "white",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  editProfile: {
    fontSize: 15,
    textAlign: "center",
    color: "#9796A1",
    marginTop: 5,
  },
  formContainer: {
    width: "90%",
    marginTop: 30,
  },
  heading: {
    fontSize: 16,
    color: "grey",
    marginTop: 20,
    marginBottom: 5,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CDE2F1",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  profileImageedit: {
    width: 60,
    height: 60,
  },
});
