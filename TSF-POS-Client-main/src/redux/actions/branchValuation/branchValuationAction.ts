import client from "../../../client/axiosInstance";
import {
  DELETE_BRANCH_VALUATION_ERROR,
  DELETE_BRANCH_VALUATION_PENDING,
  DELETE_BRANCH_VALUATION_SUCCESS,
  GET_BRANCH_VALUATION_ERROR,
  GET_BRANCH_VALUATION_PENDING,
  GET_BRANCH_VALUATION_SUCCESS,
} from "../../../constants/reduxActionsNames/branchValidation";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import {
  DeleteBranchValuationResponse,
  GetBranchValuationsResponse,
} from "./types";

export const getBranchValuation =
  (branchId?: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: GET_BRANCH_VALUATION_PENDING });
      const { data }: { data: GetBranchValuationsResponse } = await client.get(
        `/branch-valuation/list?branch=${branchId ? branchId : ""}`
      );
      if (data.success)
        dispatch({
          type: GET_BRANCH_VALUATION_SUCCESS,
          payload: { data: data.data, totalAmount: data.totalAmount },
        });
    } catch (error) {
      errorDispatcher(error, GET_BRANCH_VALUATION_ERROR, dispatch);
    }
  };

// delete branch valuation
export const deleteBranchValuation =
  (valuationId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: DELETE_BRANCH_VALUATION_PENDING });
      const { data }: { data: DeleteBranchValuationResponse } =
        await client.delete(`/branch-valuation/action/${valuationId}}`);
      dispatch({
        type: DELETE_BRANCH_VALUATION_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      errorDispatcher(error, DELETE_BRANCH_VALUATION_ERROR, dispatch);
    }
  };
