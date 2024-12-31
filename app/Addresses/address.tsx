import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { useAllAddresses, useCreateAddress } from "@/hooks/useAddress";
import AddNewAddressForm from "@/components/AddNewAddressForm";
import LoadingModal from "@/components/Loading";
import appContext from "@/context/appContext";
import { Ionicons } from "@expo/vector-icons";

const Addresses: React.FC = () => {
  const { selectedAddress, setSelectedAddress } = useContext(appContext);
  const [condition, setCondition] = useState<"Addresses" | "NewAddress">(
    "Addresses"
  );
  const { data, error, isLoading } = useAllAddresses();
  const handleSelectAddress = (address: any) => {
    if (selectedAddress?._id === address._id) {
      setSelectedAddress(null); // Unselect if the address is already selected
    } else {
      setSelectedAddress(address); // Select the tapped address
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image source={require("../../assets/images/Group 18258.png")} />
          </TouchableOpacity>
          <Text style={styles.header}>My Addresses</Text>
        </View>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "Addresses" && styles.activeButton,
            ]}
            onPress={() => setCondition("Addresses")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "Addresses" && styles.activeText,
              ]}
            >
              Addresses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "NewAddress" && styles.activeButton,
            ]}
            onPress={() => setCondition("NewAddress")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "NewAddress" && styles.activeText,
              ]}
            >
              New Address
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {condition === "Addresses" ? (
            <>
              <Text
                style={{
                  textAlign: "center",
                  position: "absolute",
                  top: -17,
                  zIndex: 999,
                  left: "33%",
                }}
              >
                "Tap to Select Address"
              </Text>
              {isLoading && <LoadingModal visible={isLoading} />}
              <FlatList
                style={{ marginBottom: "35%" }}
                data={data?.addresses || []}
                keyExtractor={(item) => item._id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectAddress(item)}>
                    {/* Tick Icon */}
                    {item._id === selectedAddress?._id && (
                      <View style={styles.tickContainer}>
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="green"
                        />
                      </View>
                    )}
                    <View style={styles.specialitemslist}>
                      <View style={{ flexDirection: "column" }}>
                        <View
                          style={{ flexDirection: "row", paddingVertical: 5 }}
                        >
                          <Text style={styles.address}>State : </Text>
                          <Text>{item.state}</Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", paddingVertical: 5 }}
                        >
                          <Text style={styles.address}>City : </Text>
                          <Text>{item.city}</Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", paddingVertical: 5 }}
                        >
                          <Text style={styles.address}>Street : </Text>
                          <Text>{item.street}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          ) : (
            <AddNewAddressForm />
          )}
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
    flex: 1,
    padding: 15,
    height: "100%",
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
  specialitemslist: {
    marginRight: 15,
    height: 120,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  address: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tickContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10, // Ensure the tick is above other content
  },
});

export default Addresses;
