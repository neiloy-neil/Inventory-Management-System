import client from "../../../client/axiosInstance";
import {
  ADD_SALE_ERROR,
  ADD_SALE_PENDING,
  ADD_SALE_SUCCESS,
  GET_SALE_ERROR,
  GET_SALE_PENDING,
  GET_SALE_SUCCESS,
} from "../../../constants/reduxActionsNames/sale";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { AddSaleResponse, GetSaleResponse } from "./types";

export const addSale =
  (sale: object): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: ADD_SALE_PENDING });
      const { data }: { data: AddSaleResponse } = await client.post(
        "/sale/add",
        sale
      );
      console.log(data, "data");
      dispatch({
        type: ADD_SALE_SUCCESS,
        payload: { sale: data.sale, message: data.message },
      });
    } catch (error) {
      errorDispatcher(error, ADD_SALE_ERROR, dispatch);
    }
  };

export const getSale =
  (saleId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: GET_SALE_PENDING });
      const { data }: { data: GetSaleResponse } = await client.get(
        `/sale/action/${saleId}`
      );
      console.log(data, "data");
      dispatch({ type: GET_SALE_SUCCESS, payload: data.sale });
    } catch (error) {
      errorDispatcher(error, GET_SALE_ERROR, dispatch);
    }
  };
