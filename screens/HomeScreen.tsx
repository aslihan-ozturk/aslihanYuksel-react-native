import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import type { Product, Category } from "../App";

import BubbleOptions from "../components/BubbleOptions";
import { updateProducts } from "../actions/productActions";
import { connect } from "react-redux";

type Props = {
  navigation: any;
  products: Product[];
  route: any;
  updateProductList: (products: Product[]) => void;
};

const HomeScreen = (props: Props) => {
  const { navigation } = props;
  const [isLoading, setLoading] = useState(true);

  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getProducts = () => {
    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
      .then((response) => response.json())
      .then((json) => {
        props.updateProductList(json);
        setFilteredData(json);
        setSelectedCategory("");
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategories = () => {
    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
      .then((response) => response.json())
      .then((json) => setCategoriesList(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    //updating current filtered products shown
    setCategory(selectedCategory);
  }, [props.products]);

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { product: item })}
        style={[styles.renderItemBox]}
      >
        <View style={styles.item}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.avatar,
            }}
          />
          <View style={[styles.priceBox]}>
            <Text style={[styles.title]}>{item.name}</Text>
            <Text style={[styles.price]}>{"$" + item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const setCategory = (category: string) => {
    setSelectedCategory(category);
    if (category == "All") {
      setFilteredData(props.products);
    } else {
      const filteredData: Product[] = props.products.filter((each: any) => {
        return each.category === category;
      });
      setFilteredData(filteredData);
    }
  };

  const categoryFilterList = [
    {
      name: "All",
      id: "0",
      createdAt: "99",
    },
  ].concat(categoriesList);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.view}>
          <View>
            <Text style={styles.appTitleBar}>{"UPayments Store"}</Text>
            <BubbleOptions
              options={categoryFilterList}
              onOptionSelect={(category: string) => setCategory(category)}
              initialId={"0"}
            />
          </View>
          <FlatList
            style={styles.flatlist}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item: Product) => item.id}
            extraData={selectedId}
            numColumns={2}
          />
          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate("Add", { categoriesList: categoriesList })
              }
            >
              <Text style={styles.btnLabel}>{"+"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: StatusBar.currentHeight || 0,
  },
  view: {
    height: Dimensions.get("window").height - 100,
    flexGrow: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    width: 100,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  renderItemBox: {
    backgroundColor: "#DFDFDE",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#7F8487",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    flex: 1,
    maxWidth: Dimensions.get("window").width / 2 - 12,
    height: Dimensions.get("window").height / 4 + 10,
    alignItems: "center",
  },
  priceBox: {
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 0,
    width: 100,
  },
  price: {
    color: "white",
    textAlign: "center",
  },
  appTitleBar: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  buttonBox: {
    justifyContent: "flex-end",
    right: 10,
    alignSelf: "flex-end",
  },
  addButton: {
    backgroundColor: "grey",
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 10,
  },
  btnLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  flatlist: {
    marginBottom: 60,
  },
  categoryView: {
    padding: 10,
  },
});

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateProductList: (products: Product[]) => {
      dispatch(updateProducts(products));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
