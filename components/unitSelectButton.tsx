import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import appContext from "@/context/appContext";
import { showError } from "@/utils/toastMessage";

type Props = {
  item: any;
};

const UnitInputButton: React.FC<Props> = ({ item }) => {
  const { cartItems, addItemToCart, updateItemQuantity } =
    useContext(appContext);
  const [modalVisible, setModalVisible] = useState(false);
  const cartItem = cartItems.find((cartItem: any) => cartItem._id === item._id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || "1");
  const [unit, setUnit] = useState("kg");

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity?.toString() || "1");
    }
  }, [cartItems]);

  useEffect(() => {
    if (quantity) {
      handleAddToCart();
    }
  }, [quantity]);

  const handleAddToCart = () => {
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showError("Please enter a valid quantity greater than 0");
      return;
    }

    console.log("parsedQuantity", parsedQuantity);

    if (!cartItem) {
      addItemToCart({ ...item, quantity: parsedQuantity });
    } else {
      updateItemQuantity({ id: item._id, quantity: parsedQuantity });
    }
  };

  const units = ["kg", "lbs"];

  return (
    <View style={styles.container}>
      <View style={{ width: 70 }}>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 10,
  },
});

export default UnitInputButton;
