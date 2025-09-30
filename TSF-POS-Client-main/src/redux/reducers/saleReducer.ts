import {
  ADD_SALE_ERROR,
  ADD_SALE_SUCCESS,
  CLEAR_SALE_MESSAGE,
  GET_SALE_ERROR,
  GET_SALE_PENDING,
  GET_SALE_SUCCESS,
} from "../../constants/reduxActionsNames/sale";
import { ReduxAction } from "../redux";

const saleReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case ADD_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        sale: action.payload.sale,
        success: true,
      };
    case ADD_SALE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SALE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        sale: action.payload,
      };

    case GET_SALE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SALE_MESSAGE:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};

export default saleReducer;
