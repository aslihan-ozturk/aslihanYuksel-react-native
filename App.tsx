import React from "react";
import { SectionListRenderItemInfo, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import configureStore from "./root/store";

const store = configureStore();

export type RootStackParamList = {
  Home: { isProductCreated?: boolean };
  Detail: { product: Product };
  Add: { categoriesList: Category[] };
};

export type Product = {
  name: string;
  avatar: string;
  price: string;
  description: string;
  id: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Add" component={CreateProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
