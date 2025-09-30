import {
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_ERROR,
} from "./../../../constants/reduxActionsNames/expenses/index";
import client from "../../../client/axiosInstance";
import { AddExpenseData } from "../../../components/sections/Expenses/AddExpense/types";
import {
  ADD_EXPENSE_PENDING,
  EXPENSES_ERROR,
  EXPENSES_PENDING,
  EXPENSES_SUCCESS,
} from "../../../constants/reduxActionsNames/expenses";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { AddExpenseResponse, ExpensesResponse } from "./types";

export const getExpenses =
  (url: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: EXPENSES_PENDING });
      const { data }: { data: ExpensesResponse } = await client.get(`${url}`);

      if (data.success)
        dispatch({
          type: EXPENSES_SUCCESS,
          payload: { expenses: data.expenses, totalExpense: data.totalExpense },
        });
    } catch (error) {
      errorDispatcher(error, EXPENSES_ERROR, dispatch);
    }
  };

// Add Expense
export const addExpense =
  (expenseData: AddExpenseData): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: ADD_EXPENSE_PENDING });
      const { data }: { data: AddExpenseResponse } = await client.post(
        `/expense/add?branch=${expenseData.branch}`,
        expenseData
      );
      if (data.success)
        dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, ADD_EXPENSE_ERROR, dispatch);
    }
  };
