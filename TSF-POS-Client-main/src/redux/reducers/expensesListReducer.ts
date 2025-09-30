import {
  ADD_EXPENSE_ERROR,
  ADD_EXPENSE_PENDING,
  ADD_EXPENSE_SUCCESS,
  CLEAR_EXPENSES_MESSAGES,
  EXPENSES_ERROR,
  EXPENSES_PENDING,
  EXPENSES_SUCCESS,
} from "../../constants/reduxActionsNames/expenses";
import { ReduxAction } from "../redux";

const expensesListReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case EXPENSES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: action.payload.expenses,
        totalExpense: action.payload.totalExpense,
      };
    case EXPENSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Add Expenses
    case ADD_EXPENSE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADD_EXPENSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_EXPENSES_MESSAGES:
      return {
        ...state,
        error: null,
        message: null,
      };

    default:
      return state;
  }
};

export default expensesListReducer;
