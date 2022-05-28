import { UPDATE_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
};

interface Action {
  type: string;
  payload: any;
}

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
