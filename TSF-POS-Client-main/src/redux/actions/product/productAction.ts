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
import { GetAllProductsResponse } from "../products/types";

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
      
      console.log("getProduct called with ID:", productId);
      
      // Since the action endpoint returns 404, we'll use the list endpoint approach
      try {
        console.log("Attempting to fetch all products and filter");
        const { data }: { data: GetAllProductsResponse } = await client.get("/product/list");
        
        console.log("Product list response:", data);
        
        if (data.success) {
          // Try to find the product by _id or productId
          const foundProduct = data.products.find(
            (product) => product._id === productId || product.productId.toString() === productId
          );
          
          if (foundProduct) {
            console.log("Found product in list:", foundProduct);
            dispatch({ type: GET_PRODUCT_SUCCESS, payload: foundProduct });
            return;
          } else {
            console.log("Product not found in list");
            throw new Error("Product not found in product list");
          }
        } else {
          throw new Error("Failed to fetch product list");
        }
      } catch (listError: any) {
        console.log("Error fetching product list:", listError.response || listError);
        
        // Create a clear error message
        let errorMessage = "Failed to load product details. ";
        
        if (listError.response) {
          errorMessage += `Product list endpoint error: ${listError.response.status} - ${listError.response.statusText}. `;
        } else {
          errorMessage += "Unable to connect to the server. Please check if the backend is running.";
        }
        
        errorDispatcher(new Error(errorMessage), GET_PRODUCT_ERROR, dispatch);
      }
    } catch (error: any) {
      console.log("Unexpected error in getProduct:", error);
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