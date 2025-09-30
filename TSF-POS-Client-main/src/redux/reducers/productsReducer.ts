import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
  REMOVE_PRODUCTS_MESSAGES,
} from "../../constants/reduxActionsNames/products";
import { ReduxAction } from "../redux";

const productsReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_PRODUCTS_MESSAGES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productsReducer;
