import { LoginResponse } from "./types/loginAction";
import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
} from "../../../constants/reduxActionsNames/user";
import { AppDispatch, RootThunk } from "../../redux";
import { LoginData } from "../../../pages/Login/types";
import client from "../../../client/axiosInstance";

export const loginUser =
  (loginData: LoginData): RootThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // dispatching the login pending state
      dispatch({ type: LOGIN_PENDING });

      // calling the api to login
      const { data }: { data: LoginResponse } = await client.post(
        "/auth/login",
        loginData
      );

      // setting the user to state
      if (data.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        localStorage.setItem("token", data.token);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.message,
        });
      }
      dispatch({ type: LOGIN_ERROR, payload: error.message });
    }
  };
