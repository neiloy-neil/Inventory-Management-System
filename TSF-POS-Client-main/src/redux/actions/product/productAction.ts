import client from "../../../client/axiosInstance";
import {
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_PENDING,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  MOVE_PRODUCT_ERROR,
  MOVE_PRODUCT_PENDING,
  MOVE_PRODUCT_SUCCESS,
} from "../../../constants/reduxActionsNames/product";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk, SuccessMessageType } from "../../redux";
import { ProductSuccess } from "./types";

export const addProduct =
  (product: FormData): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: ADD_PRODUCT_PENDING });
      const { data }: { data: SuccessMessageType } = await client.post(
        "/product/create",
        product
      );
      if (data.success)
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, ADD_PRODUCT_ERROR, dispatch);
    }
  };

export const deleteProduct =
  (productId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_PENDING });
      const { data }: { data: SuccessMessageType } = await client.delete(
        `/product/action/${productId}`
      );
      if (data.success)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, DELETE_PRODUCT_ERROR, dispatch);
    }
  };

export const editProduct =
  (productId: string, product: object): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: EDIT_PRODUCT_PENDING });
      const { data }: { data: SuccessMessageType } = await client.put(
        `/product/action/${productId}`,
        product
      );
      if (data.success)
        dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, EDIT_PRODUCT_ERROR, dispatch);
    }
  };

export const getProduct =
  (productId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: GET_PRODUCT_PENDING });
      const { data }: { data: ProductSuccess } = await client.get(
        `/product/search?productId=${productId}`
      );
      if (data.success)
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
      errorDispatcher(error, GET_PRODUCT_ERROR, dispatch);
    }
  };

export const moveProduct =
  (
    productId: string,
    fromBranchId: string,
    toBranchId: string,
    quantity: number
  ): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: MOVE_PRODUCT_PENDING });
      const { data }: { data: SuccessMessageType } = await client.post(
        `/branch/move-product/${productId}`,
        { fromBranchId, toBranchId, quantity }
      );
      if (data.success)
        dispatch({ type: MOVE_PRODUCT_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, MOVE_PRODUCT_ERROR, dispatch);
    }
  };
