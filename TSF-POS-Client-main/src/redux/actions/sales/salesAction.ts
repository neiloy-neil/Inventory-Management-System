import client from "../../../client/axiosInstance";
import {
  PARTIAL_PAYMENT_ERROR,
  PARTIAL_PAYMENT_PENDING,
  PARTIAL_PAYMENT_SUCCESS,
} from "../../../constants/reduxActionsNames/partialPayment";
import {
  SALES_ERROR,
  SALES_PENDING,
  SALES_SUCCESS,
} from "../../../constants/reduxActionsNames/sales";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { PartialPaymentResponse, SalesResponse } from "./types";

export const getSales =
  (url: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SALES_PENDING });
      const { data }: { data: SalesResponse } = await client.get(`${url}`);
      if (data.success)
        dispatch({ type: SALES_SUCCESS, payload: data.saleInfo });
    } catch (error) {
      errorDispatcher(error, SALES_ERROR, dispatch);
    }
  };

export const getPartialPaymentInfo =
  (url: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PARTIAL_PAYMENT_PENDING });
      const { data }: { data: PartialPaymentResponse } = await client.get(
        `${url}`
      );
      if (data.success)
        dispatch({ type: PARTIAL_PAYMENT_SUCCESS, payload: data });
    } catch (error) {
      errorDispatcher(error, PARTIAL_PAYMENT_ERROR, dispatch);
    }
  };
