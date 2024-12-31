import appContext from "@/context/appContext";
import { showError } from "@/utils/toastMessage";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  item: any; // Pass the item object
};

const IncrementDecrementButton: React.FC<Props> = ({ item }) => {
  const { cartItems, addItemToCart, updateItemQuantity, removeItemFromCart } =
    useContext(appContext);

  const cartItem = cartItems.find((cartItem: any) => cartItem._id === item._id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrease = () => {
    if (!cartItem) {
      addItemToCart({ ...item, quantity: 1 });
    } else {
      updateItemQuantity({ id: item._id, quantity: quantity + 1 });
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      showError("quantity must be atleast 1");
    } else if (quantity > 1) {
      // Decrement quantity
      updateItemQuantity({ id: item._id, quantity: quantity - 1 });
    }
  };

  return (
    <View style={styles.counterContainer}>
      <TouchableOpacity onPress={handleDecrease}>
        <AntDesign name="minuscircleo" size={30} color="#87CDF6" />
      </TouchableOpacity>
      <Text style={styles.countText}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrease}>
        <AntDesign name="pluscircle" size={30} color="#87CDF6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default IncrementDecrementButton;
