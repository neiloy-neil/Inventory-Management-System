import { User } from "../../../types/User/userTypes";
import client from "../../../client/axiosInstance";
import {
  PROMISE_DESTROY,
  PROMISE_ERROR,
  PROMISE_PENDING,
  PROMISE_SUCCESS,
} from "../../../constants/reduxActionsNames/promise";
import errorDispatcher from "../../dispatcher/errorDispatcher";
import { AppDispatch, PromiseSuccessType, RootThunk } from "../../redux";

export const deleteUser =
  (userId: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: PromiseSuccessType } = await client.delete(
        `/user/action/${userId}`
      );
      if (data.success)
        return dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      errorDispatcher(error, PROMISE_ERROR, dispatch);
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 300);
    }
  };

// add user to the system
export const addUserToSystem: RootThunk =
  (user: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: PromiseSuccessType } = await client.post(
        `/user/create`,
        user
      );
      if (data.success)
        return dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      errorDispatcher(error, PROMISE_ERROR, dispatch);
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 300);
    }
  };
