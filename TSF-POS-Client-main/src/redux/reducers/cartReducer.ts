import { toast } from "react-hot-toast";
import {
  ADD_TO_CART,
  CHANGE_PRICE,
  CHANGE_QUANTITY,
  CLEAR_CART,
} from "../../constants/reduxActionsNames/cart";
import { CartProduct } from "../../types/Product/ProductTypes";
import { ReduxAction } from "../redux";

const cartReducer = (
  state = {
    cart: [],
  },
  action: ReduxAction
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = state.cart.find(
        (pd: CartProduct) => pd._id === action.payload._id
      );
      if (product) {
        toast.error("Product Already Available At Cart");
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    case CHANGE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((pd: CartProduct) =>
          pd._id === action.payload._id ? action.payload : pd
        ),
      };
    }

    case CHANGE_PRICE: {
      return {
        ...state,
        cart: state.cart.map((pd: CartProduct) =>
          pd._id === action.payload._id ? action.payload : pd
        ),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
