import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BubbleOptions from "../components/BubbleOptions";
import { updateProducts } from "../actions/productActions";
import type { Product } from "../App";
import { connect } from "react-redux";

type Props = {
  navigation: any;
  route: any;
  updateProductList: (products: Product[]) => void;
};

const CreateProductScreen = (props: Props) => {
  const { navigation, route } = props;
  const categoriesList = route.params.categoriesList;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setLoading] = useState(false);

  const createProduct = () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        category: category,
        description: description,
        avatar: imgUrl,
        developerEmail: "aslihan-ozturk@hotmail.com",
      }),
    };

    fetch(
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => handleUpdate())
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleUpdate = () => {
    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
      .then((response) => response.json())
      .then((json) => {
        props.updateProductList(json);
        navigation.navigate("Home", {});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container} removeClippedSubviews={false}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
            placeholder={"product name"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => setPrice(text)}
            value={price}
            placeholder={"price"}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.description}
            onChangeText={(text) => setDescription(text)}
            value={description}
            multiline={true}
            placeholder={"description"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setImgUrl(text)}
            value={imgUrl}
            placeholder={"image link"}
          />
          <View style={styles.categoryView}>
            <Text>{"Selected Category: " + category}</Text>
            <BubbleOptions
              options={categoriesList}
              onOptionSelect={(category: string) => setCategory(category)}
            />
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={createProduct}
            >
              <Text style={styles.btnLabel}>{"Create"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  description: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  categoryView: {
    padding: 10,
  },
  buttonView: {
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateProductList: (products: Product[]) => {
      dispatch(updateProducts(products));
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateProductScreen);
