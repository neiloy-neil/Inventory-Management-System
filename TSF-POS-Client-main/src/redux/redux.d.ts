import { ThunkDispatch } from "@reduxjs/toolkit";
import { Action, AnyAction } from "redux";
import { RootState } from "./store/configureStore";
import { User } from "../types/User/userTypes";
import { Branch } from "../types/Branch/branchTypes";
import { CartProduct, Product } from "../types/Product/ProductTypes";
import { SearchedProduct } from "../types/Product/searchProductTypes";
import { Sale } from "../types/Sale/sale";
import { SaleInfo } from "./actions/sales/types";
import { Expense } from "../types/Expense/ExpenseType";
import { CustomOrderFromServer } from "../types/CustomOrder/CustomOrderTypes";
import { BranchValuation } from "./actions/branchValuation/types";
import { CustomersState } from "./reducers/customers/customersReducer";
import { InventoryState } from "./reducers/inventory/inventoryReducer";

export interface ReduxAction extends Action {
  payload: object | string | Array;
}

export type RootThunk = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export interface PromiseSuccessType {
  success: boolean;
  message: string;
}

interface StateType {
  user: {
    loading: boolean;
    error: string;
    loggedIn: boolean;
    message: string | null;
    user: User;
  };
  users: {
    loading: boolean;
    users: User[];
    error: error;
  };
  branches: {
    loading: boolean;
    loaded?: boolean;
    branches: Array<{
      _id: string;
      name: string;
      address: string;
    }>;
  };
  branch: {
    loading: boolean;
    error: string | null;
    branch: Branch;
    message: string | null;
  };
  product: {
    loading: boolean;
    error?: string | null;
    product?: SearchedProduct;
    message?: string | null;
  };
  products: {
    loading: boolean;
    error: string | null;
    message: string | null;
    products: Product[];
  };
  sale: {
    sale: Sale;
    loading: boolean;
    success: boolean;
    message: string | null;
    error: string;
  };
  customOrder: {
    loading: boolean;
    message: string | null;
    error: string | null;
    orders: CustomOrderFromServer[];
    order: CustomOrderFromServer;
    amount: {
      advancePayment: number;
      fullPayment: number;
      totalRevenue: number;
    };
  };
  sales: {
    sales: SaleInfo;
    loading: boolean;
    error: string;
  };
  expenses: {
    expenses: Expense[];
    loading: boolean;
    error?: string;
    message?: string;
    totalExpense: number;
  };
  partialPayment: {
    amountRecived: number;
    amountToBeRecived: number;
    loading: boolean;
    error: string;
  };

  branchValuation: {
    loading: boolean;
    totalAmount: number;
    valuationList: BranchValuation[];
    error: string;
    message: string;
  };

  promise: {
    loading: boolean;
    success: boolean;
    message: string | null;
    error: string | null;
  };
  dashboard: {
    fromDate: string;
    toDate: string;
    branch: string;
  };

  cart: {
    cart: CartProduct[];
  };
  
  customers: CustomersState;
  inventory: InventoryState;
}

export interface SuccessMessageType {
  success: true;
  message: string;
}