import client from "../../../client/axiosInstance";
import {
  BRANCHES_ERROR,
  BRANCHES_PENDING,
  BRANCHES_SUCCESS,
} from "../../../constants/reduxActionsNames/branches";

import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { BranchListSuccess } from "./types";

export const getBranchList = (): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: BRANCHES_PENDING });
    const { data }: { data: BranchListSuccess } = await client.get(
      "/branch/list"
    );
    if (data.success)
      dispatch({ type: BRANCHES_SUCCESS, payload: data.branches });
  } catch (error) {
    errorDispatcher(error, BRANCHES_ERROR, dispatch);
  }
};
