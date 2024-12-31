import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";

const FilterScreen = () => {
  const [sortOption, setSortOption] = useState("relevance");
  const [offers, setoffers] = useState("freeDelivery");
  const [quickfilters, setquickfilters] = useState("");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(500);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
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
            <Image source={require("../../assets/images/Group 18258.png")} />
          </TouchableOpacity>
          <View style={{ alignItems: "center", flex: 30 }}>
            <Text style={styles.header}>Filter</Text>
          </View>
        </View>

        <ScrollView style={{ width: "100%" }}>
          {/* <Text style={styles.sectionTitle}>Sort</Text>
          <RadioButton.Group
            onValueChange={(value) => setSortOption(value)}
            value={sortOption}
          >
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Relevance (default)</Text>
              <RadioButton value="relevance" color="#87CDF6" />
            </View>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Fast delivery</Text>
              <RadioButton value="fastDelivery" color="#87CDF6" />
            </View>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Distance</Text>
              <RadioButton value="distance" color="#87CDF6" />
            </View>
          </RadioButton.Group> */}

          {/* <Text style={styles.sectionTitle}>Offers</Text>
          <RadioButton.Group
            onValueChange={(value) => setoffers(value)}
            value={offers}
          >
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Free delivery</Text>
              <RadioButton value="freeDelivery" color="#87CDF6" />
            </View>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Accept vouchers</Text>
              <RadioButton value="acceptVouchers" color="#87CDF6" />
            </View>
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Deal</Text>
              <RadioButton value="Deal" color="#87CDF6" />
            </View>
          </RadioButton.Group> */}

          {/* <Text style={styles.sectionTitle}>Quick filters</Text>
          <RadioButton.Group
            onValueChange={(value) => setquickfilters(value)}
            value={quickfilters}
          >
            <View style={styles.radioButton}>
              <Text style={styles.radioText}>Rating 4.0+</Text>
              <RadioButton value="" color="#87CDF6" />
            </View>
          </RadioButton.Group> */}

          <Text style={styles.price}>Price</Text>
          <Text style={styles.priceText}>Min Price: ${minPrice}</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={10}
            maximumValue={500}
            step={100}
            value={minPrice}
            onValueChange={(value) => setMinPrice(value)}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#D3D3D3"
          />

          <Text style={styles.priceText}>Max Price: ${maxPrice}</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={10}
            maximumValue={500}
            step={100}
            value={maxPrice}
            onValueChange={(value) => setMaxPrice(value)}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#D3D3D3"
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/home",
                  params: { minPrice, maxPrice },
                })
              }
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    left: 0,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#87CDF6",
    marginVertical: 2,
    textDecorationLine: "underline",
  },
  price: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
    color: "#87CDF6",
    marginVertical: 2,
    textDecorationLine: "underline",
  },
  radioButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  radioText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 14,
    marginBottom: 8,
  },
  applyButton: {
    bottom: 0,
    backgroundColor: "#87CDF6",
    padding: 16,
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "80%",
  },
  applyButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FilterScreen;
