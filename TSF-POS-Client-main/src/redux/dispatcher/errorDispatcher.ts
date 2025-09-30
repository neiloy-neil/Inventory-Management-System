import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch } from "../redux";

interface ErrorResponse extends AxiosResponse {
  message: string;
}
interface ErrorTypes extends AxiosError {
  response: ErrorResponse;
}

export const errorDispatcher = (
  error: ErrorTypes | any,
  type: string,
  dispatch: AppDispatch
) => {
  if (error.response?.data?.message) {
    dispatch({ type, payload: error.response.data.message });
  } else {
    dispatch({ type, payload: error.message });
  }
};

export default errorDispatcher;
