import client from "../../../client/axiosInstance";
import {
  BRANCH_ADD_ERROR,
  BRANCH_ADD_PENDING,
  BRANCH_ADD_SUCCESS,
  BRANCH_ERROR,
  BRANCH_PENDING,
  BRANCH_SUCCESS,
  CLEAR_BRANCH_MESSAGES,
} from "../../../constants/reduxActionsNames/branch";
import {
  PROMISE_DESTROY,
  PROMISE_ERROR,
  PROMISE_PENDING,
  PROMISE_SUCCESS,
} from "../../../constants/reduxActionsNames/promise";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { BranchAddResponse, BranchEditResponse, BranchResponse } from "./types";

export const addBranch =
  (branchData: BranchData): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: BRANCH_ADD_PENDING });
      const { data }: { data: BranchAddResponse } = await client.post(
        `/branch/create`,
        branchData
      );
      if (data.success)
        dispatch({ type: BRANCH_ADD_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, BRANCH_ADD_ERROR, dispatch);
    }
  };

export const getBranch =
  (branchId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: CLEAR_BRANCH_MESSAGES });
      dispatch({ type: BRANCH_PENDING });
      const { data }: { data: BranchResponse } = await client.get(
        `/branch/action/${branchId}`
      );

      console.log(data);
      if (data.success)
        dispatch({ type: BRANCH_SUCCESS, payload: data.branch });
    } catch (error: any) {
      errorDispatcher(error, BRANCH_ERROR, dispatch);
    }
  };

// edit branch
export const editBranch =
  (branchData: BranchData, branchId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: BranchEditResponse } = await client.put(
        `/branch/action/${branchId}`,
        branchData
      );

      if (data.success)
        dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      errorDispatcher(error, PROMISE_ERROR, dispatch);
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 300);
    }
  };

// delete branch
export const deleteBranch =
  (branchId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: BranchEditResponse } = await client.delete(
        `/branch/action/${branchId}`
      );

      if (data.success)
        dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      errorDispatcher(error, PROMISE_ERROR, dispatch);
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 300);
    }
  };
