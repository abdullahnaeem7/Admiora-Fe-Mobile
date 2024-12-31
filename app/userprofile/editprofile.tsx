import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import appContext from "@/context/appContext";
import { router } from "expo-router";
import { useUpdateCustomerProfile } from "@/hooks/useCustomer";
import { showSuccess } from "@/utils/toastMessage";

export default function editprofile() {
  const { user, setUser } = useContext(appContext);
  const [userName, setuserName] = useState(user?.userName || "");
  const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: updateProfile } = useUpdateCustomerProfile();
  const update = async () => {
    setIsLoading(true);
    updateProfile(
      { userName: userName, phoneNumber: phoneNumber },
      {
        onSuccess: (response) => {
          setUser({ userName: userName, phoneNumber: phoneNumber });
          showSuccess("Profile Updated Successfully.");
          setIsLoading(false);
        },

        onError: (error) => {
          console.error("Failed to update profile:", error);
          alert("Failed to update profile. Please try again.");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 10, top: 6, left: 0 }}
            onPress={() => router.replace("/(tabs)/profile")}
          >
            <Image source={require("../../assets/images/Group 18258.png")} />
          </TouchableOpacity>
          <View>
            <Text style={styles.header}>Update Profile</Text>
          </View>
        </View>
        <Text style={styles.heading}>Full name</Text>
        <TextInput
          style={styles.input}
          placeholder="Arlene McCoy"
          placeholderTextColor="black"
          onChangeText={(text) => setuserName(text)}
          value={userName}
        />
        <Text style={styles.heading}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="018-49862746"
          placeholderTextColor="black"
          onChangeText={(text) => setphoneNumber(text)}
          value={phoneNumber}
        />
        {/* <Text style={styles.heading}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="black"
          onChangeText={(text) => setstate(text)}
          value={state}
        />
        <Text style={styles.heading}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="black"
          onChangeText={(text) => setcity(text)}
          value={city}
        />
        <Text style={styles.heading}>Street(include house number)</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          placeholderTextColor="black"
          onChangeText={(text) => setstreet(text)}
          value={street}
        /> */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={update}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.savetext}>Save</Text>
            )}
          </TouchableOpacity>
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
    paddingHorizontal: 15,
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
    paddingHorizontal: 60,
    fontWeight: "bold",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
});
