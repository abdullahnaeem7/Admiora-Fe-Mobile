import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { getTopOrderedProducts } from "@/services/product";
import { Feather } from "@expo/vector-icons";
import AddRemoveCartButton from "../removeitemcart.tsx/AddRemoveCartButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function FoodDetails() {
  const { id } = useLocalSearchParams();
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getTopOrderedProducts();
        console.log("response>>>>>>>>>>: ", response);
        const product = response.topOrderedProducts.find(
          (item: any) => item._id === id
        );
        setProductDetails(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#87CDF6" />
      </View>
    );
  }

  if (!productDetails) {
    return (
      <View style={styles.loader}>
        <Text>No product details available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ position: "relative", width: "100%" }}>
            <Image
              style={styles.headerimage}
              source={{ uri: productDetails.images[0] }}
            />
            <TouchableOpacity
              style={{ position: "absolute", zIndex: 10, top: -10, left: -12 }}
              onPress={() => router.back()}
            >
              <Image source={require("../../assets/images/Group 18258.png")} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>{productDetails.name}</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15, color: "#858992" }}>
                {productDetails.description || "No description available."}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <Text style={{ fontSize: 24 }}>In Stock</Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#87CDF6",
                fontSize: 24,
              }}
            >
              {productDetails.stock}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <Text style={{ fontSize: 24 }}>Type</Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#87CDF6",
                fontSize: 24,
              }}
            >
              {productDetails?.cut}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => ""}
            style={{
              backgroundColor: "#87CDF6",
              borderRadius: 25,
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={styles.carticon}>
                <Feather
                  style={{ padding: 2 }}
                  name="shopping-cart"
                  size={20}
                  color="black"
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </Text>
            </View>
            <AddRemoveCartButton
              style={{ width: "100%", position: "absolute", right: 0 }}
              item={productDetails}
            />
          </TouchableOpacity>
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
    width: "100%",
    paddingHorizontal: 24,
    maxWidth: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  headerimage: {
    height: 190,
    marginTop: 20,
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "500",
    color: "#323643",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carticon: {
    marginRight: 10,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 50,
  },
});
