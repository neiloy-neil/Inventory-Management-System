import {
  CLEAR_PARTIAL_PAYMENT_MESSAGES,
  PARTIAL_PAYMENT_ERROR,
  PARTIAL_PAYMENT_PENDING,
  PARTIAL_PAYMENT_SUCCESS,
} from "../../constants/reduxActionsNames/partialPayment";
import { ReduxAction } from "../redux";

const partialPaymentReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case PARTIAL_PAYMENT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case PARTIAL_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        amountRecived: action.payload.secondPartialAmountRecived,
        amountToBeRecived: action.payload.secondPartialAmountToBeRecived,
      };
    case PARTIAL_PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_PARTIAL_PAYMENT_MESSAGES:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default partialPaymentReducer;
