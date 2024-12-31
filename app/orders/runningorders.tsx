import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  useMyOrders,
  useDeleteOrder,
  useUpdateOrder,
  useCreateOrder,
} from "@/hooks/useOrder";
import AddRemoveCartButton from "../removeitemcart.tsx/AddRemoveCartButton";
import { showError, showSuccess } from "@/utils/toastMessage";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import LoadingModal from "@/components/Loading";

const orders = () => {
  const [condition, setCondition] = useState("current");
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState("");
  const [reOrderModalVisible, setReOrderModalVisible] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>([]);
  const [modalVisibleReorder, setmodalVisibleReorder] = useState(false);
  const [modalVisibleOrderDetails, setmodalVisibleOrderDetails] =
    useState(false);
  const [reOrderOrder, setReOrderOrder] = useState<any>({});

  const { data, error, isLoading } = useMyOrders();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const { mutate: updatOrder } = useUpdateOrder();
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useCreateOrder();

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const showDatePicker = () => {
    setDatePickerOpen(true);
  };

  if (isLoading) {
    return <LoadingModal visible={isLoading} />;
  }
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerOpen(false);
  };

  const currentOrders = data?.orders?.filter(
    (order: any) => order.status !== "delivered" && order.status !== "cancelled"
  );

  const orderHistory = data?.orders?.filter(
    (order: any) => order.status === "delivered" || order.status === "cancelled"
  );

  const handleDeleteOrder = async (orderId: string) => {
    setLoading(true);
    try {
      const stts = { status: "cancelled" };
      const body = { orderId: orderId, updates: stts };
      updatOrder(body, {
        onSuccess: () => {
          showSuccess("Order cancelled successfully.");
          queryClient.invalidateQueries({ queryKey: ["my-orders"] });
          setLoading(false);
          setCancelModalVisible("");
        },
        onError: (error) => {
          console.error("Error cancelling the order:", error);
          setLoading(false);
          showError("Error occurred while cancelling the order.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      showError("Unexpected error occurred. Please try again.");
    } finally {
      setIsModalVisible(false);
      setCondition("current");
    }
  };

  const onReorderPress = (orderItem: any) => {
    let newOrderBody: any = {};
    newOrderBody.address = orderItem.address._id;
    newOrderBody.paymentType = "cash";
    newOrderBody.items = [];
    orderItem.items.forEach((product: any) => {
      const existItem = {
        productRef: product.productRef._id,
        quantity: product.quantity,
      };
      newOrderBody.items.push(existItem);
    });

    setReOrderOrder(orderItem);
    setmodalVisibleReorder(true);
  };

  const handlePlaceOrder = () => {
    if (!selectedDate) {
      alert("Please select a Date");
      return;
    }
    setLoading(true);
    reOrderOrder.orderDate = selectedDate;
    createOrder(reOrderOrder, {
      onSuccess: (response) => {
        showSuccess("order placed successfully");
        setmodalVisibleReorder(false);
        setReOrderModalVisible("");
        setReOrderOrder({});
        setLoading(false);
        queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      },
      onError: (error) => {
        showError("Failed on re order:");
        setLoading(false);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image source={require("../../assets/images/Group 18258.png")} />
          </TouchableOpacity>
          <Text style={styles.header}>My Orders</Text>
        </View>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "current" && styles.activeButton,
            ]}
            onPress={() => setCondition("current")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "current" && styles.activeText,
              ]}
            >
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              condition === "history" && styles.activeButton,
            ]}
            onPress={() => setCondition("history")}
          >
            <Text
              style={[
                styles.switchText,
                condition === "history" && styles.activeText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {condition === "current" ? (
            <View>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : (
                <FlatList
                  style={{ marginBottom: "35%" }}
                  data={(currentOrders || []).sort((a: any, b: any) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                  })}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    const firstItem = item.items?.[0];
                    const productRef = firstItem?.productRef;

                    return (
                      <View style={styles.specialitemslist}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 20,
                            paddingHorizontal: 20,
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            {productRef?.images?.[0] ? (
                              <Image
                                source={{ uri: productRef.images[0] }}
                                style={styles.specialitemsimage}
                              />
                            ) : (
                              <Text>No Image</Text> // Fallback if no image
                            )}
                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 20,
                              }}
                            >
                              <Text style={styles.categoryTextspecial}>
                                Quantity: {firstItem?.quantity || "N/A"}{" "}
                              </Text>
                              <Text style={styles.categoryTextspeciall}>
                                {productRef?.name || "No Name"}{" "}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "column" }}>
                            <Text style={styles.Tidtext}>TID</Text>
                            <Text style={styles.Tidnumber}>
                              {item.orderNumber || "No Order Number"}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            marginTop: 20,
                          }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: "#9796A1" }}>Now</Text>
                            <Text style={{ color: "green" }}>
                              {item.status
                                ? item.status.replace(/_/g, " ")
                                : "N/A"}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: "#9796A1" }}>
                              {formatDate(item.createdAt) || "No Date"}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                setmodalVisibleOrderDetails(true);
                                setSelectedOrder(item);
                              }}
                            >
                              <Text style={{ color: "#87CDF6", marginTop: 10 }}>
                                Order Details
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              borderRadius: 25,
                              borderWidth: 1,
                              borderColor: "#87CDF6",
                              padding: 10,
                              width: "90%",
                              height: 43,
                              alignSelf: "center",
                              marginTop: 20,
                              backgroundColor: "#fff",
                            }}
                            onPress={() => {
                              setCancelModalVisible(item._id);
                            }}
                            disabled={Loading}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "#F24343",
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                Cancel
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          ) : (
            <View style={{ height: "100%" }}>
              <FlatList
                style={{ marginBottom: "35%" }}
                data={(orderHistory || []).sort((a: any, b: any) => {
                  const dateA = new Date(a.createdAt).getTime();
                  const dateB = new Date(b.createdAt).getTime();
                  return dateB - dateA;
                })}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={styles.orderhistorylist}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        paddingHorizontal: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={{
                            uri:
                              item.items[0].productRef?.images[0] ||
                              "https://via.placeholder.com/150",
                          }}
                          style={styles.specialitemsimage}
                        />
                        <View
                          style={{ flexDirection: "column", marginLeft: 20 }}
                        >
                          <Text style={styles.categoryTextspecial}>
                            Quantity: {item.items[0].quantity}
                          </Text>
                          <Text style={styles.categoryTextspeciall}>
                            {item.items[0].productRef?.name || "No Name"}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.Tidtext}>TID</Text>
                        <Text style={styles.Tidnumber}>{item.orderNumber}</Text>
                        <Text
                          style={[
                            styles.statusText,
                            item.status === "cancelled"
                              ? styles.cancelledText
                              : styles.deliveredText,
                          ]}
                        >
                          {item.status}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#87CDF6",
                          borderRadius: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setReOrderModalVisible(item)}
                        >
                          <Text
                            style={{
                              paddingHorizontal: 40,
                              paddingVertical: 12,
                              fontSize: 15,
                            }}
                          >
                            Re-Order
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedInvoice(item.invoice);
                          setModalVisible(true);
                        }}
                      >
                        <Text style={{ color: "#9796A1", marginTop: 10 }}>
                          View Invoice
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.footerText}>AD MAIORA SEAFOOD</Text>
              <View>
                {selectedInvoice ? (
                  <Image
                    style={{
                      width: screenWidth * 0.8,
                      height: screenHeight * 0.5,
                    }}
                    source={{ uri: selectedInvoice }}
                  />
                ) : (
                  <Text>No Invoice Available</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleReorder}
          onRequestClose={() => setmodalVisibleReorder(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setmodalVisibleReorder(false)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
              <Text
                style={{ marginBottom: 10, fontWeight: "bold", fontSize: 17 }}
              >
                Select Date to Re-order
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Feather
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={showDatePicker}
                />
                <Text style={styles.dateText}>
                  {selectedDate
                    ? moment(selectedDate).format("YYYY-MM-DD")
                    : "Select a date"}
                </Text>
              </View>
              <DatePicker
                modal
                open={isDatePickerOpen}
                date={selectedDate || new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerOpen(false)}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handlePlaceOrder()}
              >
                <Text style={styles.closeButtonText}>
                  {Loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    "Confirm Reorder"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleOrderDetails}
          onRequestClose={() => setmodalVisibleOrderDetails(false)}
        >
          <View style={styles.modalOrderDetails}>
            <View style={styles.modalOrderDetailss}>
              <TouchableOpacity
                onPress={() => setmodalVisibleOrderDetails(false)}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>

              <View style={{ marginTop: 10, marginBottom: "10%" }}>
                {selectedOrder?.items?.length ? (
                  <FlatList
                    data={selectedOrder.items || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      const productRef = item?.productRef;

                      return (
                        <View style={styles.OrderDetaillist}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 20,
                              paddingHorizontal: 20,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              {productRef?.images?.[0] ? (
                                <Image
                                  source={{ uri: productRef.images[0] }}
                                  style={styles.specialitemsimage}
                                />
                              ) : (
                                <Text>No Image</Text> // Fallback if no image
                              )}
                              <View style={{ marginLeft: 20 }}>
                                <Text style={styles.categoryTextspecial}>
                                  Quantity: {item.quantity || "N/A"}
                                </Text>
                                <Text style={styles.categoryTextspeciall}>
                                  {productRef?.name || "No Name"}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ marginLeft: 20, marginTop: 5 }}>
                            <Text>
                              Status: {selectedOrder?.status || "N/A"}
                            </Text>
                          </View>
                          <View style={{ marginLeft: 20, marginTop: 5 }}>
                            <Text>
                              Date:{" "}
                              {selectedOrder?.createdAt
                                ? new Date(
                                    selectedOrder.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                ) : (
                  <Text>No Items Found</Text>
                )}
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={cancelModalVisible ? true : false}
          onRequestClose={() => setCancelModalVisible("")}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.footerText}>
                Are You sure. You want to Cancel The order?
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    handleDeleteOrder(cancelModalVisible);
                  }}
                  disabled={Loading} // Disable button when loading
                >
                  <Text style={styles.closeButtonText}>
                    {Loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      "Yes"
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelNoButton}
                  onPress={() => setCancelModalVisible("")}
                >
                  <Text style={styles.closeButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={reOrderModalVisible ? true : false}
          onRequestClose={() => setReOrderModalVisible("")}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.footerText}>
                Are You sure. You want to Re-Order?
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    onReorderPress(reOrderModalVisible);
                  }}
                  disabled={Loading} // Disable button when loading
                >
                  <Text style={styles.closeButtonText}>
                    {Loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      "Yes"
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelNoButton}
                  onPress={() => setReOrderModalVisible("")}
                >
                  <Text style={styles.closeButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    padding: 16,
    height: "100%",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  contentText: {
    fontSize: 18,
    color: "#333",
  },
  categoryTextspecial: {
    fontSize: 15,
    color: "#8D8686",
    textAlign: "left",
  },
  categoryTextspeciall: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  specialitemsimage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginBottom: 5,
  },
  specialitemslist: {
    marginRight: 15,
    height: 238,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0 , 0.2)",
    backgroundColor: "#fff",
  },
  OrderDetaillist: {
    height: 150,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0 , 0.2)",
    backgroundColor: "#fff",
  },
  orderhistorylist: {
    marginRight: 15,
    height: 164,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#87CDF6",
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0 , 0.2)",
    backgroundColor: "#fff",
  },

  Tidtext: {
    fontSize: 14,
    color: "#87CDF6",
  },
  Tidnumber: {
    fontSize: 14,
    color: "#87CDF6",
  },
  orderstatus: {
    fontSize: 14,
    color: "lightgreen",
    marginTop: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOrderDetails: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalOrderDetailss: {
    width: "85%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 30,
    elevation: 10,
    overflow: "hidden",
  },
  headerrText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  tokenContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  tokenLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#000",
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  footerText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginTop: 10,
  },
  cancelNoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
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
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  statusText: { color: "#fff", marginTop: 10 },
  cancelledText: { color: "red", marginTop: 10 },
  deliveredText: { color: "#0EB813", marginTop: 10 },

  crossIcon: {
    marginBottom: 5,
    textAlign: "right",
  },
});

export default orders;
