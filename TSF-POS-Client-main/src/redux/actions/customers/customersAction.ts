import { Customer, CustomerFormData } from "../../../types/Customer/customerTypes";
import client from "../../../client/axiosInstance";
import { AppDispatch, RootThunk } from "../../redux";
import {
  CUSTOMERS_ERROR,
  CUSTOMERS_LOADING,
  CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
} from "../../../constants/reduxActionsNames/customers";

// Action types
export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Action interfaces
interface FetchCustomersAction {
  type: typeof CUSTOMERS_LOADING | typeof CUSTOMERS_SUCCESS | typeof CUSTOMERS_ERROR;
  payload?: Customer[] | string;
}

interface AddCustomerAction {
  type: typeof ADD_CUSTOMER_SUCCESS;
  payload: Customer;
}

interface UpdateCustomerAction {
  type: typeof UPDATE_CUSTOMER_SUCCESS;
  payload: Customer;
}

interface DeleteCustomerAction {
  type: typeof DELETE_CUSTOMER_SUCCESS;
  payload: string; // customer ID
}

export type CustomerActionTypes =
  | FetchCustomersAction
  | AddCustomerAction
  | UpdateCustomerAction
  | DeleteCustomerAction;

// Action creators
export const fetchCustomers = (): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    const response = await client.get("/customers");
    dispatch({
      type: CUSTOMERS_SUCCESS,
      payload: response.data.customers,
    });
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to fetch customers",
    });
  }
};

export const addCustomer = (customerData: CustomerFormData): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    const response = await client.post("/customers", customerData);
    dispatch({
      type: ADD_CUSTOMER_SUCCESS,
      payload: response.data.customer,
    });
    return response.data.customer;
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to add customer",
    });
    throw error;
  }
};

export const updateCustomer = (customerId: string, customerData: Partial<CustomerFormData>): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    const response = await client.put(`/customers/${customerId}`, customerData);
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: response.data.customer,
    });
    return response.data.customer;
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to update customer",
    });
    throw error;
  }
};

export const deleteCustomer = (customerId: string): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    await client.delete(`/customers/${customerId}`);
    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: customerId,
    });
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to delete customer",
    });
    throw error;
  }
};

// Loyalty points actions
export const addLoyaltyPoints = (customerId: string, points: number, reason: string): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    const response = await client.post(`/customers/${customerId}/loyalty-points`, { points, reason });
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: response.data.customer,
    });
    return response.data.customer;
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to update loyalty points",
    });
    throw error;
  }
};

// Purchase history actions
export const fetchCustomerPurchaseHistory = (customerId: string): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CUSTOMERS_LOADING });
    const response = await client.get(`/customers/${customerId}/purchase-history`);
    // This would typically update a separate part of the state
    return response.data.purchaseHistory;
  } catch (error: any) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: error.response?.data?.message || "Failed to fetch purchase history",
    });
    throw error;
  }
};