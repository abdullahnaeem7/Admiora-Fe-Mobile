import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React, { useContext, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Dimensions } from "react-native";
import { router, useRouter } from "expo-router";
import appContext from "@/context/appContext";
import IncrementDecrementButton from "@/components/IncrementDecrementButton";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useCreateOrder } from "@/hooks/useOrder";
import UnitInputButton from "@/components/unitSelectButton";

export default function cart() {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [poNumber, setPoNumber] = useState("");

  const { cartItems, removeItemFromCart, selectedAddress, clearCart } =
    useContext(appContext);
  const { mutate: createOrder } = useCreateOrder();

  const showDatePicker = () => {
    setDatePickerOpen(true);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  const handlePlaceOrder = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty. Please add items to proceed.");
      return;
    }

    if (!selectedAddress) {
      alert("Please select an address first");
      router.replace("/Addresses/address");
      return;
    }

    if (!selectedDate) {
      alert("Please select a Date");
      return;
    }

    const orderData = {
      items: cartItems.map((item: any) => ({
        productRef: item._id,
        quantity: item.quantity,
      })),
      address: selectedAddress._id,
      paymentType: "cash",
      orderDate: selectedDate,
      poNumber: poNumber,
    };

    setIsLoading(true);
    console.log("orderData", orderData);
    createOrder(orderData, {
      onSuccess: (response) => {
        console.log("Order created successfully:", response);
        clearCart();
        setIsLoading(false);
        router.replace("/success/successScreen");
      },
      onError: (error) => {
        console.error("Failed to create order:", error);
        alert("Failed to create order. Please try again.");
        setIsLoading(false);
      },
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.listImages} source={{ uri: item?.images[0] }} />
        <View style={styles.itemDetails}>
          <Text style={styles.addOnText}>{item?.name}</Text>
          <Text style={styles.description}>
            {item?.description?.substring(0, 30)}
            {item?.description?.length > 30 ? "..." : ""}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.Type}>Type :</Text>
            <Text style={styles.typeText}>
              {item?.category?.name || "No Category"}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              removeItemFromCart(item._id);
            }}
          >
            <Entypo
              name="cross"
              size={20}
              color="black"
              style={styles.crossIcon}
            />
          </TouchableOpacity>
          {item.cut == "sliced" ? (
            <View style={{ flexDirection: "row" }}>
              <UnitInputButton item={item} />
              <Text style={{ fontSize: 20, marginTop: 2 }}>
                {item?.UM || "no Unit"}
              </Text>
            </View>
          ) : (
            <IncrementDecrementButton item={item} />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View style={{ height: "65%" }}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)/home")}
                style={{ flex: 1 }}
              >
                <Image
                  source={require("../../assets/images/Group 18258.png")}
                />
              </TouchableOpacity>
              <View style={{ alignItems: "center", flex: 10 }}>
                <Text style={styles.header}>Cart</Text>
              </View>
            </View>

            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          </ScrollView>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Order Date</Text>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={showDatePicker}
          >
            <Feather name="calendar" size={26} color="black" />
            <Text style={styles.dateText}>
              {selectedDate
                ? moment(selectedDate).format("YYYY-MM-DD")
                : "Select a date"}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={isDatePickerOpen}
          date={selectedDate || new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerOpen(false)}
        />
        <View style={styles.containerPoNumber}>
          <Text style={styles.label}>PO Number (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter PO Number"
            value={poNumber}
            onChangeText={setPoNumber}
            keyboardType="default"
          />
        </View>
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handlePlaceOrder} disabled={isLoading}>
            <View style={styles.checkoutbtn}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.checkout}>CHECKOUT</Text>
              )}
            </View>
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
    paddingHorizontal: 20,
    maxWidth: windowWidth,
    height: windowHeight,
    flex: 1,
  },

  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  addOnText: {
    fontSize: 15,
    color: "#323643",
    marginLeft: 10,
    fontWeight: "bold",
  },

  description: {
    flex: 1,
    fontSize: 14,
    color: "#8C8A9D",
    marginLeft: 10,
  },

  typeText: {
    fontSize: 15,
    color: "#323643",
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },

  Type: {
    fontSize: 15,
    color: "#323643",
    marginLeft: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  checkoutbtn: {
    backgroundColor: "#87CDF6",
    padding: 15,
    borderRadius: 25,
  },
  checkout: {
    textAlign: "center",
    fontSize: 15,
    paddingHorizontal: 30,
    fontWeight: "bold",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  listImages: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    flexDirection: "column",
  },

  actions: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  crossIcon: {
    marginBottom: 20,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginRight: 30,
  },
  containerPoNumber: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "35%",
    textAlign: "center",
  },
});
