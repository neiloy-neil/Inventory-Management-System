import {
  DELETE_MODERATOR_ERROR,
  DELETE_MODERATOR_PENDING,
  DELETE_MODERATOR_SUCCESS,
} from "../../../constants/reduxActionsNames/moderator";
import { AppDispatch, RootThunk } from "../../redux";
import { DeleteModeratorResponse } from "./types";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import client from "../../../client/axiosInstance";

export const deleteModeratorFromBranch =
  (moderatorId: string, branchId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: DELETE_MODERATOR_PENDING });
      const { data }: { data: DeleteModeratorResponse } = await client.delete(
        `/branch/moderator/${branchId}?moderatorId=${moderatorId}`
      );
      if (data.success)
        dispatch({ type: DELETE_MODERATOR_SUCCESS, payload: data.message });
    } catch (error) {
      errorDispatcher(error, DELETE_MODERATOR_ERROR, dispatch);
    }
  };
