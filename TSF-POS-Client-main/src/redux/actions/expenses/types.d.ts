import { Expense } from "../../../types/Expense/ExpenseType";

export interface ExpensesResponse {
  success: boolean;
  expenses: Expense[];
  totalExpense: number;
}

export interface AddExpenseResponse {
  success: boolean;
  message: string;
}
