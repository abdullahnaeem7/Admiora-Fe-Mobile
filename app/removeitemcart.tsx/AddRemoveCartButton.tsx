import appContext from "@/context/appContext";
import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

type Props = {
  item: any;
  infav?: boolean;
  style?: any;
};

const AddRemoveCartButton: React.FC<Props> = ({ item, infav, style }) => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(appContext);

  const isInCart = cartItems.some((cartItem: any) => cartItem._id === item._id);

  const handlePress = () => {
    if (isInCart) {
      removeItemFromCart(item._id);
    } else {
      addItemToCart({ ...item, quantity: 1 });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={
        style
          ? style
          : infav
          ? styles.buttonContainerFav
          : styles.buttonContainer
      }
    >
      <FontAwesome6
        name={isInCart ? "minus" : "plus"}
        size={20}
        color="black"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#87CDF6",
    width: 26,
    position: "absolute",
    bottom: 65,
    left: 215,
    height: 26,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainerFav: {
    backgroundColor: "#87CDF6",
    width: 26,
    display: "flex",
    height: 26,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddRemoveCartButton;
