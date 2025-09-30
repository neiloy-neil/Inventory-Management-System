import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "../../../constants/reduxActionsNames/user";
import { AppDispatch, RootThunk } from "../../redux";

export const errorAndSuccessRemover =
  (): RootThunk => (dispatch: AppDispatch) => {
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: CLEAR_SUCCESS });
  };
