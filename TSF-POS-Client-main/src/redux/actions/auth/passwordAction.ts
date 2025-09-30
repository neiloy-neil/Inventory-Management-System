import {
  ForgotPasswordSuccess,
  ResetPasswordSuccess,
} from "./types/password.d";
import client from "../../../client/axiosInstance";
import { AppDispatch, RootThunk } from "../../redux";
import {
  PROMISE_DESTROY,
  PROMISE_ERROR,
  PROMISE_PENDING,
  PROMISE_SUCCESS,
} from "../../../constants/reduxActionsNames/promise";
import { ResetPasswordFormTypes } from "../../../pages/ResetPassword/types";

export const forgotPassword =
  (email: string): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: ForgotPasswordSuccess } = await client.post(
        `/auth/forgot-password/${email}`
      );
      dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      if (error.response) {
        return dispatch({
          type: PROMISE_ERROR,
          payload: error.response.data.message,
        });
      }
      dispatch({
        type: PROMISE_ERROR,
        payload: error.message,
      });
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 100);
    }
  };

// reset password

export const resetPassword: RootThunk =
  (token: string, password: ResetPasswordFormTypes) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PROMISE_PENDING });
      const { data }: { data: ResetPasswordSuccess } = await client.post(
        `/auth/reset-password/${token}`,
        password
      );
      dispatch({ type: PROMISE_SUCCESS, payload: data.message });
    } catch (error: any) {
      if (error.response) {
        return dispatch({
          type: PROMISE_ERROR,
          payload: error.response.data.message,
        });
      }
      dispatch({
        type: PROMISE_ERROR,
        payload: error.message,
      });
    } finally {
      setTimeout(() => {
        dispatch({ type: PROMISE_DESTROY });
      }, 100);
    }
  };
