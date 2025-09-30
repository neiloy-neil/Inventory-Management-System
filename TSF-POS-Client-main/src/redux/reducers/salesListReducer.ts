import {
  CLEAR_SALES_MESSAGES,
  SALES_ERROR,
  SALES_PENDING,
  SALES_SUCCESS,
} from "../../constants/reduxActionsNames/sales";

import { ReduxAction } from "../redux";

const salesReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case SALES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: action.payload,
        loaded: true,
      };
    case SALES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SALES_MESSAGES:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default salesReducer;
