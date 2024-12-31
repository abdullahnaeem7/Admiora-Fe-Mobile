import React, { useContext, useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import settings from "../settings/appsettings";
import orders from "../orders/runningorders";
import chat from "../chat/chats";
import appContext from "@/context/appContext";
import { useAllProducts, useTopOrderedProducts } from "@/hooks/useProduct";
import { useAllCategory } from "@/hooks/catagory";
import useLogoutHandler from "@/hooks/useLogoutHandler";
import LoadingModal from "@/components/Loading";
import AddRemoveCartButton from "../removeitemcart.tsx/AddRemoveCartButton";
import Addresses from "../Addresses/address";
import FavoriteButton from "@/components/FavoriteButton";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useSearchParams } from "expo-router/build/hooks";
import { useCustomerProfile } from "@/hooks/useCustomer";
import { getProfile } from "@/services/customer";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 200);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const minPrice = searchParams.get("minPrice")!;
  const maxPrice = searchParams.get("maxPrice")!;
  const { data, error, isLoading, refetch } = useAllProducts(
    searchTerm,
    page,
    limit,
    minPrice,
    maxPrice
  );

  const {
    data: categorydata,
    error: categoryerror,
    isLoading: categoryloading,
  } = useAllCategory();

  const {
    data: dataofpopularitems,
    error: errorofpopularitems,
    isLoading: isLoadingofpopularitems,
    refetch: refetchToporder,
  } = useTopOrderedProducts(searchTerm, page, limit, minPrice, maxPrice);
  const handleDataRefetch = async () => {
    await refetch();
    await refetchToporder();
  };
  useEffect(() => {
    handleDataRefetch();
  }, [debouncedSearchTerm]);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.mainheading}>What would you like to order</Text>
          </View>

          <View style={{ paddingHorizontal: 15, flexDirection: "row" }}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                placeholder="Find food ..."
              />
            </View>
            {/* <TouchableOpacity onPress={() => router.push("/filters/filter")}>
              <View style={styles.filter}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/images/Group 17877.png")}
                />
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={{ paddingLeft: 15 }}>
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
              >
                Categories
              </Text>
            </View>
            {categoryloading ? (
              <ActivityIndicator size="small" color="#87CDF6" />
            ) : (
              <FlatList
                data={categorydata?.categories || []}
                horizontal
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.categoryItem}>
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/categories/categoriesitems",
                          params: { id: item._id },
                        })
                      }
                    >
                      <Image
                        source={{ uri: item?.image || [] }}
                        style={styles.categoryImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </View>
                )}
              />
            )}
          </View>
          <View style={styles.itemstext}>
            <Text style={styles.specialitemstext}>Top Order Products</Text>
            <TouchableOpacity
              onPress={() => router.push("/viewall/viewallitems")}
            >
              <Text style={styles.viewall}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 15 }}>
            {isLoadingofpopularitems ? (
              <ActivityIndicator size="small" color="#87CDF6" />
            ) : (
              <FlatList
                data={dataofpopularitems?.topOrderedProducts.slice(0, 5) || []}
                horizontal
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.specialitemslist}>
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/Food/fooddetails",
                          params: { id: item._id },
                        })
                      }
                    >
                      <Image
                        source={{ uri: item.images[0] }}
                        style={styles.specialitemsimage}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "90%",
                      }}
                    >
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.categoryTextspecial}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
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
                              marginTop: 10,
                              fontSize: 12,
                              color: "#7E8392",
                            }}
                          >
                            10-15 mins
                          </Text>
                        </View>
                      </View>
                      <View style={styles.McDonald}>
                        <FavoriteButton productId={item._id} />
                      </View>
                      <AddRemoveCartButton item={item} />
                    </View>
                  </View>
                )}
              />
            )}
          </View>

          <View>
            <Text style={styles.popularitemstext}>All Products</Text>
          </View>

          <View style={{ paddingLeft: 15, width: "100%", height: "100%" }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#87CDF6" />
            ) : (
              <FlatList
                style={{ marginBottom: "17%" }}
                data={data?.products || []}
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
                            style={{ marginTop: 5, marginRight: 3 }}
                            name="delivery-dining"
                            size={18}
                            color="#87CDF6"
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#7E8392",
                              marginTop: 5,
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
};

const CustomDrawerContent = (props: any) => {
  const { logoutAndNavigate, isLoading } = useLogoutHandler();
  const { user } = useContext(appContext);

  const onUserLogout = () => {
    Alert.alert(
      "Are you sure you want to logout?",
      "",
      [
        {
          text: "Yes",
          onPress: () => {
            logoutAndNavigate();
          },
        },
        {
          text: "Cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {isLoading && <LoadingModal text="loging out " visible={isLoading} />}
      <View style={styles.profileContainer}>
        <View style={{ flexDirection: "column" }}>
          <Image
            style={styles.avatar}
            source={
              user?.image
                ? { uri: user.image }
                : require("../../assets/images/images.jpg")
            }
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{user?.userName || "Guest"}</Text>
            <Text style={styles.email}>
              {user?.email || "guest@example.com"}
            </Text>
            <Text style={styles.userRole}>
              {user?.account_type || "guest@example.com"}
            </Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onUserLogout()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../assets/images/Group 18072.png")} />
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const App = () => {
  const { cartItems } = useContext(appContext);
  const { user } = useContext(appContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => router.push("/cart/Cartview")}
          >
            <View>
              <FontAwesome5 name="shopping-cart" size={24} color="#87CDF6" />
              {true && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: user.restaurant.name,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="My Orders"
        component={orders}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "location" : "location"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={chat}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={settings}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Helps & FAQs"
        component={settings}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "message-processing-outline"
                  : "message-processing-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Addresses"
        component={Addresses}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "location" : "location"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
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
    marginBottom: 20,
  },
  searchInput: {
    width: 325,
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
  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: 500,
    color: "#67666D",
    textAlign: "left",
  },
  categoryTextspecial: {
    fontSize: 15,
    fontWeight: 600,
    color: "#333",
    textAlign: "left",
  },
  mainheading: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    color: "#87CDF6",
    fontWeight: 700,
    paddingLeft: 15,
  },
  itemstext: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    paddingHorizontal: 15,
  },
  specialitemstext: {
    fontSize: 18,
    marginBottom: 20,
    color: "#323643",
    fontWeight: "bold",
  },
  viewall: {
    fontSize: 13,
    marginTop: 6,
    color: "#87CDF6",
  },
  specialitemslist: {
    alignItems: "center",
    marginRight: 15,
    height: 200,
    width: 266,
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
  },
  specialitemsimage: {
    width: 266,
    height: 136,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 5,
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
  McDonald: {
    backgroundColor: "#87CDF6",
    width: 26,
    height: 26,
    borderRadius: 25,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  iconpopularitems: {
    backgroundColor: "#87CDF6",
    width: 26,
    height: 26,
    borderRadius: 25,
    position: "absolute",
    right: 10,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconspecialadditems: {
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
  iconpopularadditems: {
    backgroundColor: "#87CDF6",
    width: 26,
    height: 26,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  filter: {
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
    marginBottom: 20,
  },
  avatar: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#9EA1B1",
  },
  userRole: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  logoutButton: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
    padding: 10,
    marginBottom: 50,
    backgroundColor: "#87CDF6",
    borderRadius: 20,
  },
  logoutText: {
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default App;
