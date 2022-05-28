import { UPDATE_PRODUCTS } from "./types";

export const updateProducts = (products: object[]) => {
  return {
    type: UPDATE_PRODUCTS,
    payload: products,
  };
};
