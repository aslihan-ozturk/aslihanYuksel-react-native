import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen = ({ route }: Props) => {
  const item = route.params.product;
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{
            uri: item.avatar,
          }}
        />
      </View>
      <View style={styles.priceBox}>
        <View style={styles.descHeaderLine}>
          <Text style={styles.name}>{route.params.product.name}</Text>
          <Text style={styles.price}>{"$" + route.params.product.price}</Text>
        </View>
        <View>
          <Text style={styles.description}>
            {route.params.product.description}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageBox: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  priceBox: {
    borderRadius: 10,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 2.0,
    flex: 1,
    backgroundColor: "black",
    zIndex: 15000,
  },
  descHeaderLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    top: 10,
    left: 5,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    right: 5,
    top: 10,
  },
  description: {
    color: "white",
    fontWeight: "bold",
    top: 20,
    left: 5,
  },
});

export default DetailScreen;
