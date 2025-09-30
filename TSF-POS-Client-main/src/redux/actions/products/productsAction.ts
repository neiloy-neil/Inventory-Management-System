import client from "../../../client/axiosInstance";
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
} from "../../../constants/reduxActionsNames/products";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { GetAllProductsResponse } from "./types";

export const fetchAllProducts =
  (): RootThunk => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_PENDING });
      const { data }: { data: GetAllProductsResponse } = await client.get(
        "/product/list"
      );
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      errorDispatcher(error, GET_PRODUCTS_ERROR, dispatch);
    }
  };
