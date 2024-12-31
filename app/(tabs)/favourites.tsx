import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useMostFavoredProducts } from "@/hooks/useProduct";
import React from "react";
import { router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavourite";
import LoadingModal from "@/components/Loading";

const { width, height } = Dimensions.get("window");

// Function for responsive text size
const scaleFont = (size: number) => Math.round((size * width) / 375);

export default function Favourites() {
  const {
    data: favouriteProductsData,
    error: favouriteError,
    isLoading: favouriteLoading,
  } = useFavorites();

  if (favouriteLoading) {
    return <LoadingModal visible={favouriteLoading} />;
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.favourites}>Favourites</Text>
          {/* <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.replace("/cart/Cartview")}
          >
            <FontAwesome5
              name="shopping-cart"
              size={scaleFont(24)}
              color="#87CDF6"
            />
          </TouchableOpacity> */}
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          <FlatList
            data={favouriteProductsData || []}
            keyExtractor={(item) => item._id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/Food/fooddetails",
                    params: { id: item._id },
                  })
                }
              >
                <View style={styles.specialitemslist}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={[styles.specialitemsimage]}
                  />
                  <View style={styles.itemInfo}>
                    <View>
                      <Text style={styles.categoryTextspecial}>
                        {item.name}
                      </Text>
                      <Text style={styles.categoryTextspeciall}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.icons}>
                      <FavoriteButton productId={item._id} />
                    </View>
                    <View style={styles.deliveryInfo}>
                      <MaterialIcons
                        name="delivery-dining"
                        size={scaleFont(18)}
                        color="#87CDF6"
                      />
                      <Text style={styles.deliveryText}>10-15 mins</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  favourites: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
  },
  cartButton: {
    position: "absolute",
    right: width * 0.05,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    marginBottom: "10%",
  },
  specialitemslist: {
    backgroundColor: "#FFF",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 30,
    marginBottom: height * 0.02,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
  },
  specialitemsimage: {
    width: "100%",
    height: 235,
    resizeMode: "cover",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  itemInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: width * 0.03,
  },
  categoryTextspecial: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    color: "#333",
  },
  categoryTextspeciall: {
    fontSize: scaleFont(14),
    color: "#5B5B5E",
    width: "auto",
  },
  icons: {
    position: "absolute",
    right: 10,
    top: -210,
    backgroundColor: "#87CDF6",
    borderRadius: 20,
    padding: width * 0.01,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  deliveryText: {
    fontSize: scaleFont(12),
    color: "#5B5B5E",
    marginLeft: width * 0.01,
  },
});
