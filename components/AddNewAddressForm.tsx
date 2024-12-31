import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCreateAddress } from "@/hooks/useAddress";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "@/utils/toastMessage";

const AddNewAddressForm: React.FC = () => {
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const { mutate: addNewAddress } = useCreateAddress();
  const queryClient = useQueryClient();

  const clearfields = () => {
    setState("");
    setCity("");
    setStreet("");
  };

  const handleSave = async () => {
    if (!state || !city || !street) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const addressData = {
      state,
      city,
      street,
    };

    try {
      addNewAddress(addressData, {
        onSuccess: () => {
          showSuccess("added");
          queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
        onError: (error) => {
          showError("error on creation");
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save address.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="black"
        onChangeText={(text) => setState(text)}
        value={state}
      />
      <Text style={styles.heading}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="black"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Text style={styles.heading}>Street (include house number)</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        placeholderTextColor="black"
        onChangeText={(text) => setStreet(text)}
        value={street}
      />
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSave();
            clearfields();
          }}
        >
          <Text style={styles.savetext}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  heading: {
    fontSize: 16,
    color: "black",
    marginTop: 20,
    marginBottom: 5,
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
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AddNewAddressForm;
