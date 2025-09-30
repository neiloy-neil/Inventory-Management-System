import client from "../../../client/axiosInstance";
import {
  USERS_ERROR,
  USERS_PENDING,
  USERS_SUCCESS,
} from "../../../constants/reduxActionsNames/users";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, RootThunk } from "../../redux";
import { FetchUsersSuccess } from "./types";

export const fetchUsers = (): RootThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USERS_PENDING });

    const { data }: { data: FetchUsersSuccess } = await client.get(
      "/user/list"
    );

    if (data.success) dispatch({ type: USERS_SUCCESS, payload: data.users });
  } catch (error: any) {
    errorDispatcher(error, USERS_ERROR, dispatch);
  }
};
