import {
  CUSTOM_ORDER_AMOUNT_ERROR,
  CUSTOM_ORDER_AMOUNT_PENDING,
  CUSTOM_ORDER_AMOUNT_SUCCESS,
  CHANGE_ORDER_STATUS_ERROR,
  CHANGE_ORDER_STATUS_PENDING,
  CHANGE_ORDER_STATUS_SUCCESS,
  FETCH_SINGLE_CUSTOM_ORDERS_ERROR,
  FETCH_SINGLE_CUSTOM_ORDERS_SUCCESS,
} from "./../../constants/reduxActionsNames/customOrder/index";
import {
  ADD_CUSTOM_ORDER_ERROR,
  ADD_CUSTOM_ORDER_PENDING,
  ADD_CUSTOM_ORDER_SUCCESS,
  CUSTOM_ORDER_CLEAR_MESSAGE,
  FETCH_CUSTOM_ORDERS_ERROR,
  FETCH_CUSTOM_ORDERS_PENDING,
  FETCH_CUSTOM_ORDERS_SUCCESS,
  FETCH_SINGLE_CUSTOM_ORDERS_PENDING,
} from "../../constants/reduxActionsNames/customOrder";
import { ReduxAction } from "../redux";

const customOrderReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case ADD_CUSTOM_ORDER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_CUSTOM_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Order Placed Successfully",
      };
    case ADD_CUSTOM_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CUSTOM_ORDERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUSTOM_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case FETCH_CUSTOM_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_SINGLE_CUSTOM_ORDERS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SINGLE_CUSTOM_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case FETCH_SINGLE_CUSTOM_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHANGE_ORDER_STATUS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case CHANGE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CUSTOM_ORDER_AMOUNT_PENDING:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case CUSTOM_ORDER_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        amount: action.payload,
      };
    case CUSTOM_ORDER_AMOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CUSTOM_ORDER_CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};

export default customOrderReducer;
