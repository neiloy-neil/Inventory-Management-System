import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  CLEAR_PRODUCT_MESSAGE,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_PENDING,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  MOVE_PRODUCT_ERROR,
  MOVE_PRODUCT_PENDING,
  MOVE_PRODUCT_SUCCESS,
} from "../../constants/reduxActionsNames/product";
import { ReduxAction } from "../redux";

const productReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case DELETE_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case EDIT_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MOVE_PRODUCT_PENDING:
      return {
        ...state,
        loading: false,
      };
    case MOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case MOVE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_PRODUCT_MESSAGE:
      return {
        success: null,
        message: null,
      };

    default:
      return state;
  }
};

export default productReducer;
