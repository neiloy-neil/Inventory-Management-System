import {
  GET_BRANCH_VALUATION_ERROR,
  GET_BRANCH_VALUATION_PENDING,
  GET_BRANCH_VALUATION_SUCCESS,
} from "../../constants/reduxActionsNames/branchValidation";
import { ReduxAction } from "../redux";

const branchValuationReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case GET_BRANCH_VALUATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_BRANCH_VALUATION_SUCCESS:
      return {
        ...state,
        loading: false,
        totalAmount: action.payload.totalAmount,
        valuationList: action.payload.data,
      };
    case GET_BRANCH_VALUATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default branchValuationReducer;
