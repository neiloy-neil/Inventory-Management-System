import {
  CHANGE_ORDER_STATUS_ERROR,
  CHANGE_ORDER_STATUS_PENDING,
  CHANGE_ORDER_STATUS_SUCCESS,
  CUSTOM_ORDER_AMOUNT_ERROR,
  CUSTOM_ORDER_AMOUNT_PENDING,
  CUSTOM_ORDER_AMOUNT_SUCCESS,
  FETCH_CUSTOM_ORDERS_ERROR,
  FETCH_SINGLE_CUSTOM_ORDERS_ERROR,
  FETCH_SINGLE_CUSTOM_ORDERS_PENDING,
  FETCH_SINGLE_CUSTOM_ORDERS_SUCCESS,
} from "./../../../constants/reduxActionsNames/customOrder/index";
import client from "../../../client/axiosInstance";
import {
  ADD_CUSTOM_ORDER_ERROR,
  ADD_CUSTOM_ORDER_PENDING,
  ADD_CUSTOM_ORDER_SUCCESS,
  FETCH_CUSTOM_ORDERS_PENDING,
  FETCH_CUSTOM_ORDERS_SUCCESS,
} from "../../../constants/reduxActionsNames/customOrder";
import { CustomOrderType } from "../../../types/CustomOrder/CustomOrderTypes";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import {
  ChangeOrderStatusSuccess,
  CustomOrderAmountSuccess,
  FetchCustomOrdersSuccess,
  FetchSingleCustomOrderSuccess,
} from "./types";

export const addCustomOrder: RootThunk =
  (customOrderData: CustomOrderType) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: ADD_CUSTOM_ORDER_PENDING });

      await client.post("custom-order/create", customOrderData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: ADD_CUSTOM_ORDER_SUCCESS });
    } catch (error) {
      errorDispatcher(error, ADD_CUSTOM_ORDER_ERROR, dispatch);
    }
  };

export const editCustomOrder: RootThunk =
  (customOrderData: CustomOrderType, orderId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_CUSTOM_ORDERS_PENDING });

      await client.post(`custom-order/edit/${orderId}`, customOrderData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({ type: FETCH_CUSTOM_ORDERS_SUCCESS });
    } catch (error) {
      errorDispatcher(error, FETCH_CUSTOM_ORDERS_ERROR, dispatch);
    }
  };

/**
 * with this function we will get all of the custom orders
 * if the user is admin then if he do not choose the branch
 * then he will look at all of the branches
 * Mods- if mods request with this function they will pass
 * a `branchId` by default and they will recieve custom orders
 * for the branchId of they are currrently working
 */

export const fetchCustomOrders: RootThunk =
  (branchId?: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_CUSTOM_ORDERS_PENDING });

      const { data }: { data: FetchCustomOrdersSuccess } = await client.get(
        `custom-order/list?branchId=${branchId ? branchId : ""}`
      );

      dispatch({ type: FETCH_CUSTOM_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      errorDispatcher(error, FETCH_CUSTOM_ORDERS_ERROR, dispatch);
    }
  };

// with this we will fetch only one custom order by id
export const fetchSingleOrder: RootThunk =
  (orderId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: FETCH_SINGLE_CUSTOM_ORDERS_PENDING });

      const { data }: { data: FetchSingleCustomOrderSuccess } =
        await client.get(`custom-order/action/${orderId}`);

      dispatch({
        type: FETCH_SINGLE_CUSTOM_ORDERS_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      errorDispatcher(error, FETCH_SINGLE_CUSTOM_ORDERS_ERROR, dispatch);
    }
  };

// with this we will change the order status
export const changeOrderStatus: RootThunk =
  (orderId: string, orderData: object) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: CHANGE_ORDER_STATUS_PENDING });

      const { data }: { data: ChangeOrderStatusSuccess } = await client.put(
        `custom-order/action/${orderId}`,
        orderData
      );

      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      errorDispatcher(error, CHANGE_ORDER_STATUS_ERROR, dispatch);
    }
  };

// with this we will change the order status
export const getCustomOrderAmount: RootThunk =
  (url: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: CUSTOM_ORDER_AMOUNT_PENDING });
      const { data }: { data: CustomOrderAmountSuccess } = await client.get(
        url
      );

      dispatch({ type: CUSTOM_ORDER_AMOUNT_SUCCESS, payload: data.amount });
    } catch (error) {
      errorDispatcher(error, CUSTOM_ORDER_AMOUNT_ERROR, dispatch);
    }
  };
