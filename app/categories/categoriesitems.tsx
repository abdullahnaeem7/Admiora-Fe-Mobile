import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useRouter } from "expo-router";
import appContext from "@/context/appContext";
import { useAllProductsByCategoryId } from "@/hooks/useProduct";
import AddRemoveCartButton from "../removeitemcart.tsx/AddRemoveCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import { useSearchParams } from "expo-router/build/hooks";
import useDebouncedValue from "@/hooks/useDebouncedValue";

export default function viewAll() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 200);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { data: user, setUser } = useContext(appContext);
  const [data, setData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id")!;
  const {
    data: products,
    isLoading,
    error,
  } = useAllProductsByCategoryId(
    searchTerm,
    page,
    limit,
    minPrice,
    maxPrice,
    id
  );
  useEffect(() => {
    if (products) setData(products?.products);
  }, [products]);

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace("/(tabs)/home")}
            >
              <Image source={require("../../assets/images/Group 18258.png")} />
            </TouchableOpacity>
            <Text style={styles.header}>Categories</Text>
          </View>
          <View style={{ paddingHorizontal: 15, flexDirection: "row" }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                placeholder="Find your favourite food ..."
              />
            </View>
          </View>
          <View>
            <Text style={styles.popularitemstext}>Menu</Text>
          </View>

          <View style={{ paddingLeft: 15, width: "100%", height: "100%" }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#87CDF6" />
            ) : (
              <FlatList
                style={{ marginBottom: "10%" }}
                data={data || []}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={{ paddingVertical: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.popularitemslist}>
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.popularitemsimages}
                    />
                    <View style={styles.iconpopularitems}>
                      <FavoriteButton productId={item._id} />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "90%",
                        marginTop: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.categoryTextspecial}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <MaterialIcons
                            style={{ marginTop: 10, marginRight: 3 }}
                            name="delivery-dining"
                            size={18}
                            color="#87CDF6"
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#7E8392",
                              marginTop: 10,
                            }}
                          >
                            10-15 mins
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <AddRemoveCartButton item={item} infav={true} />
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
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

  badgeContainer: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "#87CDF6",
    borderRadius: 7.5,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
    marginTop: 20,
  },
  searchInput: {
    width: "100%",
    height: 51,
    flex: 1,
  },
  filterButton: {
    padding: 5,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryTextspecial: {
    fontSize: 15,
    fontWeight: 600,
    color: "#333",
    textAlign: "left",
  },

  popularitemstext: {
    fontSize: 18,
    marginTop: 20,
    color: "#323643",
    paddingLeft: 15,
    fontWeight: "bold",
  },
  popularitemslist: {
    alignItems: "center",
    marginRight: 15,
    marginTop: 15,
    height: "100%",
    width: "46%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
  },
  popularitemsimages: {
    width: "100%",
    position: "relative",
    height: 147,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  iconpopularitems: {
    backgroundColor: "#87CDF6",
    width: 24,
    height: 24,
    borderRadius: 25,
    position: "absolute",
    right: 10,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filter: {
    marginTop: 20,
    backgroundColor: "white",
    marginLeft: 20,
    width: 50,
    height: 51,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#87CDF6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    marginBottom: 40,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 30,
  },
  name: {
    marginTop: -20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#9EA1B1",
  },
  chef: {
    fontSize: 14,
    color: "black",
  },
  logoutButton: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#87CDF6",
    borderRadius: 20,
  },
  logoutText: {
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
  },
});
